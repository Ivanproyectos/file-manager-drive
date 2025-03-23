using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Interfaces.Messaging;
using MediatR;

namespace FileManagement.Service.UseCases
{
    public class CreateFileUseCase : IRequestHandler<CreateFileRequest, Unit>
    {
        private IFileUploadChannel _fileUploadChannel;
        public CreateFileUseCase(IFileUploadChannel fileUploadChannel)
        {
            _fileUploadChannel = fileUploadChannel;
        }
        public async Task<Unit> Handle(CreateFileRequest request, CancellationToken cancellationToken)
        {
            await _fileUploadChannel.QueueFileUploadAsync(request);

            return Unit.Value;
        }
    }
}
