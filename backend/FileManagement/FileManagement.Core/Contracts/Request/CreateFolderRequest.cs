using FileManagement.Core.Contracts.Response;
using MediatR;

namespace FileManagement.Core.Contracts.Request
{
    public record struct CreateFolderRequest(
        string Name,
        string Description,
        int? ParentId,
        List<CreateFolderPermissionRequest> FolderPermissions,
        bool AsignedFolder = false, 
        bool HasProcessState = false
    ) : IRequest<CreateFolderResponse>;
}
