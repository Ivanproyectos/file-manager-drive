using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Hubs;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.SignalR;

namespace FileManagement.Service.Services
{
    public class UploadNotifierService : IUploadNotifierService
    {
        private readonly IHubContext<FileUploadHub> _hubContext;
        public UploadNotifierService(IHubContext<FileUploadHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public async Task Notify(int userId, UploadedFileRequest uploadedFileRequest)
        {
            await _hubContext.Clients.User(userId.ToString())
                         .SendAsync("FileUploaded", uploadedFileRequest);
        }
    }
}
