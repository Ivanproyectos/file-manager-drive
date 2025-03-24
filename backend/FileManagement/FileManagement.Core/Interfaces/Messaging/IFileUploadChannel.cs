using FileManagement.Core.Contracts.Request;

namespace FileManagement.Core.Interfaces.Messaging
{
    public interface IFileUploadChannel
    {
        ValueTask QueueFileUploadAsync(CreateFileRequest request);
        ValueTask<CreateFileRequest> DequeueAsync(CancellationToken cancellationToken);
    }
}
