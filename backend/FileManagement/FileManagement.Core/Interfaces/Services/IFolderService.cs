using FileManagement.Core.Contracts.Dtos;
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
        public Task<List<FolderDto>> GetAllFoldersAsync();
        public Task<List<SubFolderDto>> GetSubFoldersAsync(int folderId);
        public Task<List<FileDto>> GetFolderFiles(int folderId);
        public Task DeleteFolderAndFiles(int folderId);
    }
}
