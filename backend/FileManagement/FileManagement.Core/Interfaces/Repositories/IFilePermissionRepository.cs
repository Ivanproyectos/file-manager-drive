using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IFilePermissionRepository
    {
        Task<FilePermission> GetFilePermissionByUserIdAsync(int FileId, int UserId);

        Task AddFilePermissionAsync(FilePermission filePermission);
        Task AddFilePermissionsAsync(List<FilePermission> filePermissions);
    }
}
