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
using Microsoft.AspNetCore.StaticFiles;
using System.Management;
using Microsoft.AspNetCore.SignalR;
using FileManagement.Core.Hubs;
using MediatR;

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
            _logger.LogInformation("El servicio de fondo ha comenzado.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var filesNames = new List<string>();
                    var request = await _channel.DequeueAsync(stoppingToken);

                    filesNames?.RemoveRange(0, filesNames.Count);

                    _logger.LogInformation("Procesando carga de archivos desde {Path}", request.UploadId);
                    var uploadPath = Path.Combine(Path.GetTempPath(), "uploads", request.UploadId.ToString());

                    if (!Directory.Exists(uploadPath))
                    {
                        _logger.LogWarning("La carpeta de carga no existe para el UploadId {UploadId}", request.UploadId);
                        continue;
                    }

                    var files = Directory.GetFiles(uploadPath);

                    foreach (var file in files)
                    {
                        try
                        {
                            var fileName = Path.GetFileName(file);
                            var driveFileId = await _googleDriveService.UploadFileAsync(file, fileName, _googleDriveSettings.FolderId);

                            await SaveFileRepository(driveFileId, file, request);
                            filesNames?.Add(Path.GetFileName(file));



                        }
                        catch (Exception ex)
                        {
                            NotifyUpload(request.UserId, StatusUploadFileEnum.Error, filesNames);
                            _logger.LogError(ex, "Error subiendo archivo {File}", file);
                            continue;
                        }
                    }

                    //using var scope = _serviceProvider.CreateScope();
                    //var fileHub = scope.ServiceProvider.GetRequiredService<IHubContext<FileUploadHub>>();

                    //await fileHub.Clients.User(request.UserId.ToString())
                    //    .SendAsync("FileUploaded", new UploadedFileRequest(StatusUploadFileEnum.Success, filesNames));

                    NotifyUpload(request.UserId, StatusUploadFileEnum.Success, filesNames);
                    Directory.Delete(uploadPath, true);

                }
                catch (OperationCanceledException ex)
                {
                    _logger.LogInformation("La operación fue cancelada.");
                    break;
                }
                catch (Exception ex)
                {
                  
                    continue;
                 
                }
            }
        }

        private async Task SaveFileRepository(string driveFileId, string file, CreateFileRequest request)
        {

            // Creamos un scope para usar servicios Scoped
            using var scope = _serviceProvider.CreateScope();
            var fileRepository = scope.ServiceProvider.GetRequiredService<IFileRepository>();
       
            var fileStorageRepository = scope.ServiceProvider.GetRequiredService<IFileStorageRepository>();
            var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();

            try
            {
                await unitOfWork.BeginTransactionAsync();

                var provider = new FileExtensionContentTypeProvider();
                if (!provider.TryGetContentType(file, out string contentType))
                {
                    contentType = "application/octet-stream"; 
                }


                var fileEntity = new Core.Entities.File
                {
                    FileName = Path.GetFileName(file),
                    Extension = Path.GetExtension(file),
                    MimeType = contentType,
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

                if (request.FilePermissions != null && request.FilePermissions.Any())
                {
                    var filesPermisions = request.FilePermissions.Select(fm => new FilePermission
                    {
                        FileId = fileEntity.Id,
                        UserId = fm.UserId,
                        CanView = fm.CanView,
                        CanDownload = fm.CanDownload,
                        IsDateExpired = fm.IsDateExpired,
                        ExpirationDate = fm.ExpirationDate
                    }).ToList();

                    AddFilePermisions(filesPermisions);
                }
                await unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                _logger.LogError(ex, "Error al guardar el archivo en la base de datos", file);
            }
   
        }

        private void AddFilePermisions(List<FilePermission> filesPermisions)
        {
            Task.Run(async () =>
            {
                try
                {
                    using var scope = _serviceProvider.CreateScope();
                    var filePermissionRepository = scope.ServiceProvider.GetRequiredService<IFilePermissionRepository>();

                    await filePermissionRepository.AddFilePermissionsAsync(filesPermisions);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error al guardar los permisos de los archivos en la base de datos");
                }
            });
           
        }

        private void NotifyUpload(int userId, StatusUploadFileEnum status, List<string> filesNames)
        {
            using var scope = _serviceProvider.CreateScope();
            var fileHubService = scope.ServiceProvider.GetRequiredService<IUploadNotifierService>();

            fileHubService.Notify(userId, new UploadedFileRequest(status, filesNames));
        }
    }
}
