using FileManagement.Core.Contracts.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Interfaces.Messaging
{
    public interface IFileUploadChannel
    {
        ValueTask QueueFileUploadAsync(CreateFileRequest request);
        ValueTask<CreateFileRequest> DequeueAsync(CancellationToken cancellationToken);
    }
}
