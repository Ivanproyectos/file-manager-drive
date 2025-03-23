using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Interfaces.Services
{
    public interface IGoogleDriveService
    {
        Task<string> UploadFileAsync(string localPath, string fileName, string folderDriveId);
        Task<Stream> DownloadFileAsync(string fileId);
    }
}
