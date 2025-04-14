namespace FileManagement.Core.Contracts.Dtos
{
    public record struct FolderProcessHistoryDto(
        int Id,
        bool IsActive, 
        FolderProcessStateDto State
    );
}
