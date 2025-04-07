using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IFolderPermissionRepository
    {
        Task AddFolderPermissionRangeAsync(List<FolderPermission> folderPermissions);
        Task RemoveFolderPermissionRangeAsync(List<FolderPermission> folderPermissions);
        Task UpdateFolderPermissionRangeAsync(List<FolderPermission> folderPermissions);
        Task<List<FolderPermission>> GetFolderPermissionsByFolderIdAsync(int folderId);
    }
}
