using FileManagement.Core.Contracts.Dtos;

namespace FileManagement.Core.Interfaces.Services
{
    public interface IUserFolderService
    {
        Task<List<FolderDto>> GerUserFolderByFolderIdAsync(int FolderId);

        Task<List<FolderDto>> GerUserFolderAsync();
     
    }
}
