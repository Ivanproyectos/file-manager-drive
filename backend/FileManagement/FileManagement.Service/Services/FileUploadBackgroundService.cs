using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Entities;
using FileManagement.Core.Enums;
using FileManagement.Core.Interfaces.Messaging;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;
using FileManagement.Core.Settings;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace FileManagement.Service.Services
{
    public class FileUploadBackgroundService : BackgroundService
    {
        private readonly IFileUploadChannel _channel;
        private readonly IGoogleDriveService _googleDriveService;
        private readonly IServiceProvider _serviceProvider;
        private readonly ILoggerService _logger;
        private readonly GoogleDriveSettings _googleDriveSettings;

        public FileUploadBackgroundService(
            IFileUploadChannel channel,
            IGoogleDriveService googleDriveService,
            IServiceProvider serviceProvider,
            IOptions<GoogleDriveSettings> googleDriveSettings,
            ILoggerService logger
        )
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
                    var request = await _channel.DequeueAsync(stoppingToken);

                    var filesNames = new List<string>();

                    using var scope = _serviceProvider.CreateScope();
                    var fileTempRepository =
                        scope.ServiceProvider.GetRequiredService<IFileTempRepository>();
                    var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();

                    List<FileTemp> filesTemp = null;
                    string uploadPath = null;

                    try
                    {
                        filesTemp = await fileTempRepository.GetAllByUploadIdAsync(
                            request.UploadId
                        );
                        uploadPath = Path.Combine(
                            Path.GetTempPath(),
                            "uploads",
                            request.UploadId.ToString()
                        );

                        foreach (var file in filesTemp)
                        {
                            try
                            {
                                var path = Path.Combine(uploadPath, file.FileName);
                                var fileName = Path.GetFileName(path);
                                var driveFileId = await _googleDriveService.UploadFileAsync(
                                    path,
                                    fileName,
                                    _googleDriveSettings.FolderId
                                );
                                file.StorageIdentifier = driveFileId;

                                await fileTempRepository.UpdateFileAsync(file);
                                await unitOfWork.SaveChangesAsync();

                                filesNames?.Add(Path.GetFileName(path));
                            }
                            catch (Exception fileEx)
                            {
                                _logger.LogError("Error procesando archivo {FileName}", fileEx);
                                // Continuar con el siguiente archivo
                                continue;
                            }
                        }

                        await CompleteFileRegistrationWithStorageAsync(filesTemp, request.UploadId);

                        NotifyUpload(request.UserId, StatusUploadFileEnum.Success, filesNames);
                    }
                    catch (Exception ex)
                    {
                        NotifyUpload(request.UserId, StatusUploadFileEnum.Error, filesNames);
                        _logger.LogError("Error subiendo archivo {File}", ex);
                        continue;
                    }
                    finally
                    {
                        await fileTempRepository.RemoveFileRangeAsync(filesTemp);
                        await unitOfWork.SaveChangesAsync();
                        Directory.Delete(uploadPath, true);
                    }
                }
                catch (OperationCanceledException ex)
                {
                    _logger.LogInformation("La operación fue cancelada.");
                    break;
                }
                catch (Exception ex)
                {
                    _logger.LogError("Error inesperado en el servicio de fondo", ex);
                    // Pequeña pausa para evitar bucles rápidos de error
                    await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
                }
            }
        }

        private async Task CompleteFileRegistrationWithStorageAsync(
            List<FileTemp> filesTemp,
            string uploadId
        )
        {
            using var scope = _serviceProvider.CreateScope();
            var fileRepository = scope.ServiceProvider.GetRequiredService<IFileRepository>();
            var fileStorageRepository =
                scope.ServiceProvider.GetRequiredService<IFileStorageRepository>();
            var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();

            await unitOfWork.BeginTransactionAsync();

            try
            {
                foreach (var fileTemp in filesTemp)
                {
                    var file = new Core.Entities.File
                    {
                        FileName = fileTemp.FileName,
                        Extension = fileTemp.Extension,
                        SizeBytes = fileTemp.SizeBytes,
                        MimeType = fileTemp.MimeType,
                        FolderId = fileTemp.FolderId,
                        CreatedBy = fileTemp.CreatedBy,
                        CreatedAt = fileTemp.CreatedAt,
                    };

                    await fileRepository.AddFileAsync(file);
                    await unitOfWork.SaveChangesAsync();

                    var fileStorage = new FileStorage
                    {
                        StorageProviderId = (int)StorageProviderEnum.Drive,
                        StorageIdentifier = fileTemp.StorageIdentifier,
                        CreatedBy = fileTemp.CreatedBy,
                        CreatedAt = fileTemp.CreatedAt,
                        FileId = file.Id,
                        StoragePath = uploadId,
                    };
                    await fileStorageRepository.AddFileStorageAsync(fileStorage);
                }
                await unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                await unitOfWork.RollbackAsync();
                _logger.LogError("Error al registrar los archivos", ex);
                throw;
            }
        }

        private void NotifyUpload(int userId, StatusUploadFileEnum status, List<string> filesNames)
        {
            using var scope = _serviceProvider.CreateScope();
            var fileHubService = scope.ServiceProvider.GetRequiredService<IUploadNotifierService>();

            fileHubService.Notify(userId, new UploadedFileRequest(status, filesNames));
        }
    }
}
