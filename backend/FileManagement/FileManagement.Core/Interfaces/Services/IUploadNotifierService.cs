using FileManagement.Core.Contracts.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Interfaces.Services
{
    public interface IUploadNotifierService
    {
        Task Notify(int userId, UploadedFileRequest uploadedFileRequest);
    }
}
