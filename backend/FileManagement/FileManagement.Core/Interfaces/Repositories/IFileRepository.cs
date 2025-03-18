
using CoreLayer = FileManagement.Core.Entities;
namespace FileManagement.Core.Interfaces.Repositories { 
    public interface IFileRepository
    {
        Task<List<CoreLayer.File>> GetFilesByFolderIdAsync(int FolderId);
        Task<List<CoreLayer.File>> GetFilesWithPermissionsAsync(int FolderId, int UserId);

    }
}
