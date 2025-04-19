namespace FileManagement.Core.Contracts.Response
{
    public record struct FileStorageStatusResponse(
        long UsedStorageBytes,
        long TotalStorageBytes,
        long RemainingStorageBytes
        );
}
