namespace FileManagement.Core.Contracts.Request
{
    public record struct FilePermissionRequest(int UserId, bool CanView, bool CanDownload, DateTime ExpirationDate);

}
