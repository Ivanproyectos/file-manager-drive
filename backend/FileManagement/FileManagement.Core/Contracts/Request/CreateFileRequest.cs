using MediatR;

namespace FileManagement.Core.Contracts.Request
{
    public record struct CreateFileRequest(
        int FolderId,
        string UploadId,
        List<FilePermissionRequest> FilePermissions
        ) : IRequest<Unit>
    {
    }
}
