using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Interfaces.Messaging;
using System.Threading.Channels;

namespace FileManagement.Service.Messaging
{
    public class FileUploadChannel : IFileUploadChannel
    {
        private readonly Channel<CreateFileRequest> _channel;

        public FileUploadChannel()
        {
            _channel = Channel.CreateUnbounded<CreateFileRequest>();
        }

        public async ValueTask QueueFileUploadAsync(CreateFileRequest request)
        {
            await _channel.Writer.WriteAsync(request);
        }

        public async ValueTask<CreateFileRequest> DequeueAsync(CancellationToken cancellationToken)
        {
            return await _channel.Reader.ReadAsync(cancellationToken);
        }
    }
}
