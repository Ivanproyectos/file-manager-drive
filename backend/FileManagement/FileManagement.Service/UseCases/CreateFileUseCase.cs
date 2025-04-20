using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Entities;
using FileManagement.Core.Exceptions;
using FileManagement.Core.Interfaces.Messaging;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;
using MediatR;
using Microsoft.AspNetCore.StaticFiles;

namespace FileManagement.Service.UseCases
{
    public class CreateFileUseCase : IRequestHandler<CreateFileRequest, Unit>
    {
        private IFileTempRepository _fileTempRepository;
        private IFileUploadChannel _fileUploadChannel;
        private ITokenService _tokenService;
        private ILoggerService _logger;
        private IUnitOfWork _unitOfWork;

        public CreateFileUseCase(
            IFileUploadChannel fileUploadChannel,
            ITokenService tokenService,
            IFileTempRepository fileTempRepository,
            ILoggerService logger,
            IUnitOfWork unitOfWork
        )
        {
            _fileUploadChannel = fileUploadChannel;
            _tokenService = tokenService;
            _fileTempRepository = fileTempRepository;
            _logger = logger;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(
            CreateFileRequest request,
            CancellationToken cancellationToken
        )
        {
            var decodedToken = _tokenService.DecodeToken();

            var uploadPath = Path.Combine(
                Path.GetTempPath(),
                "uploads",
                request.UploadId.ToString()
            );

            if (!Directory.Exists(uploadPath))
            {
                _logger.LogWarning(
                    "La carpeta de carga no existe para el UploadId {UploadId}",
                    request.UploadId
                );
                throw new ValidationException(
                    $"La carpeta de carga no existe para el UploadId {request.UploadId}"
                );
            }

            var files = Directory.GetFiles(uploadPath);

            var filesAdded = files.Select(file => new FileTemp
            {
                FileName = Path.GetFileName(file),
                Extension = Path.GetExtension(file),
                MimeType = GetMimeType(file),
                SizeBytes = new FileInfo(file).Length,
                FolderId = request.FolderId,
                UploadId = request.UploadId,
                CreatedAt = DateTime.UtcNow, 
                CreatedBy = _tokenService.DecodeToken().UserId
            }).ToList();

            await _fileTempRepository.AddFileRangeAsync(filesAdded);
           await _unitOfWork.SaveChangesAsync();

            request.UserId = decodedToken.UserId;
            await _fileUploadChannel.QueueFileUploadAsync(request);

            return Unit.Value;
        }

        private string GetMimeType(string file)
        {
            var provider = new FileExtensionContentTypeProvider();
            return provider.TryGetContentType(file, out string contentType) ? contentType : "application/octet-stream";
        }
    }
}
