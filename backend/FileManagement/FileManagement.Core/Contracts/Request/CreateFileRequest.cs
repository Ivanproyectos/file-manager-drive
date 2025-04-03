using MediatR;

namespace FileManagement.Core.Contracts.Request
{
    public record struct CreateFileRequest(
        int FolderId,
        string UploadId,
        int UserId,
        List<FilePermissionRequest>? FilePermissions
        ) : IRequest<Unit>
    {
    }
}
