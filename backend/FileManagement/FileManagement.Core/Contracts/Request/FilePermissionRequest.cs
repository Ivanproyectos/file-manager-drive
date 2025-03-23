namespace FileManagement.Core.Contracts.Request
{
    public record struct FilePermissionRequest(int IdUser, bool CanView, bool CanDownload, DateTime ExpirationDate);

}
