namespace FileManagement.Core.Contracts.Dtos
{
    public record struct FolderDto
    {
        public string Name { get; init; }
        public int? ParentFolderId { get; init; }
        public DateTime CreateAt { get; init; }
    }

}
