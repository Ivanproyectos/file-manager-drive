using MediatR;

namespace FileManagement.Core.Contracts.Request
{
    public record struct UpdateFolderRequest(
        int Id,
        string Name,
        string Description,
        List<int> DeletedFileIds,
        List<UpdateFolderPermissionRequest> FolderPermissions

        ): IRequest<Unit>;

}
