using CoreLayer = FileManagement.Core.Entities;


namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IUserFileRepository
    {
        Task<List<CoreLayer.File>> GerUserFileByUserIdAsync(int UserId);

        Task<List<CoreLayer.File>> GerUserFileByFolderIdAsync(int UserId, int FolderId);
    }
}
