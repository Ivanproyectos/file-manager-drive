using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Entities;
using FileManagement.Core.Enums;
using FileManagement.Core.Interfaces.Messaging;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;
using FileManagement.Core.Settings;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FileManagement.Service.Services
{
    public class FileUploadBackgroundService : BackgroundService    
    {
        private readonly IFileUploadChannel _channel;
        private readonly IGoogleDriveService _googleDriveService;
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<FileUploadBackgroundService> _logger;
        private readonly GoogleDriveSettings _googleDriveSettings;

        public FileUploadBackgroundService(
            IFileUploadChannel channel,
            IGoogleDriveService googleDriveService,
            IServiceProvider serviceProvider,
            IOptions<GoogleDriveSettings> googleDriveSettings,
            ILogger<FileUploadBackgroundService> logger)
        {
            _channel = channel;
            _googleDriveService = googleDriveService;
            _serviceProvider = serviceProvider;
            _logger = logger;
            _googleDriveSettings = googleDriveSettings.Value;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var request = await _channel.DequeueAsync(stoppingToken);

                _logger.LogInformation("Procesando carga de archivos desde {Path}", request.UploadId);
                var uploadPath = Path.Combine(Path.GetTempPath(), "uploads", request.UploadId.ToString());

                var files = Directory.GetFiles(uploadPath);

                foreach (var file in files)
                {
                    try
                    {
                        var fileName = Path.GetFileName(file);
                        var driveFileId = await _googleDriveService.UploadFileAsync(file, fileName, _googleDriveSettings.FolderId);

                        await SaveFileRepository(driveFileId, file, request);

                        // await _fileRepository.UpdateFileStatusAsync(file, driveFileId); // Actualizar tabla
                    }
                    catch (Exception ex)
                    {
                        //await unitOfWork.RollbackAsync();
                        _logger.LogError(ex, "Error subiendo archivo {File}", file);
                    }
                }
            }
        }

        private async Task SaveFileRepository(string driveFileId, string file, CreateFileRequest request)
        {

            // Creamos un scope para usar servicios Scoped
            using var scope = _serviceProvider.CreateScope();
            var fileRepository = scope.ServiceProvider.GetRequiredService<IFileRepository>();
            var filePermissionRepository = scope.ServiceProvider.GetRequiredService<IFilePermissionRepository>();
            var fileStorageRepository = scope.ServiceProvider.GetRequiredService<IFileStorageRepository>();
            var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();

            try
            {
                await unitOfWork.BeginTransactionAsync();

                var fileEntity = new Core.Entities.File
                {
                    FileName = Path.GetFileName(file),
                    Extension = Path.GetExtension(file),
                    SizeBytes = new FileInfo(file).Length,
                    FolderId = request.FolderId,
                };

                await fileRepository.AddFileAsync(fileEntity);
                await unitOfWork.SaveChangesAsync();

                var fileStorage = new Core.Entities.FileStorage
                {
                    StorageIdentifier = driveFileId,
                    FileId = fileEntity.Id,
                    StorageProviderId = (int)StorageProviderEnum.Drive,
                    StoragePath = request.UploadId
                };

                await fileStorageRepository.AddFileStorageAsync(fileStorage);
                await unitOfWork.SaveChangesAsync();

                var filesPermisions = request.FilePermissions.Select(fm => new FilePermission
                {
                    FileId = fileEntity.Id,
                    UserId = fm.UserId,
                    CanView = fm.CanView,
                    CanDownload = fm.CanDownload,
                    ExpirationDate = fm.ExpirationDate
                }).ToList();


                await filePermissionRepository.AddFilePermissionsAsync(filesPermisions);
                await unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                _logger.LogError(ex, "Error al guardar el archivo en la base de datos", file);
            }
   
        }
    }
}
