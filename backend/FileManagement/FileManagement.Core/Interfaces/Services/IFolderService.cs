using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Contracts.Response;
using FileManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Interfaces.Services
{
    public interface IFolderService
    {
        public Task<GetFolderByIdRequest> GetFolderByIdAsync(int folderId);
        public Task<List<FolderDto>> GetAllFoldersAsync(string? folderName);
        public Task<List<SubFolderDto>> GetSubFoldersAsync(int folderId);
        public Task<List<FileDto>> GetFolderFiles(int folderId);
        public Task UpdateStatus(int folderId);
        public Task ChangeProcessStatus(ChangeStatusRequest request);
        Task<List<FolderProcessState>> GetFolderProcessStatesAsync();
    }
}
