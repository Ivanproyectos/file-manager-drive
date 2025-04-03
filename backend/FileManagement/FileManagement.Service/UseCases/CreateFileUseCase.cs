using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Interfaces.Messaging;
using FileManagement.Core.Interfaces.Services;
using MediatR;

namespace FileManagement.Service.UseCases
{
    public class CreateFileUseCase : IRequestHandler<CreateFileRequest, Unit>
    {
        private IFileUploadChannel _fileUploadChannel;
        private ITokenService _tokenService;
        public CreateFileUseCase(IFileUploadChannel fileUploadChannel, ITokenService tokenService)
        {
            _fileUploadChannel = fileUploadChannel;
            _tokenService = tokenService;
        }
        public async Task<Unit> Handle(CreateFileRequest request, CancellationToken cancellationToken)
        {
            var decodedToken = _tokenService.DecodeToken();

            request.UserId = decodedToken.UserId;
            await _fileUploadChannel.QueueFileUploadAsync(request);

            return Unit.Value;
        }
    }
}
