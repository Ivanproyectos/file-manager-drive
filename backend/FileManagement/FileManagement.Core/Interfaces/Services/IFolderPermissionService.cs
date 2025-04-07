using FileManagement.Core.Contracts.Response;
using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Services;

public interface IFolderPermissionService
{
    Task<List<FolderPermissionResponse>> GetFolderPermissionsByFolderIdAsync(int folderId);
}