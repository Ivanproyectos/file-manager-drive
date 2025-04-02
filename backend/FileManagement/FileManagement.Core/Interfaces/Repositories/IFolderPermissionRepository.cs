using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IFolderPermissionRepository
    {
        Task AddFolderPermissionRangeAsync(List<FolderPermission> folderPermissions);
    }
}
