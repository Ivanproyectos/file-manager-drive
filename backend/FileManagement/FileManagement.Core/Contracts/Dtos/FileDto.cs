namespace FileManagement.Core.Contracts.Dtos
{
    public record struct FileDto
    {
        public int FileName { get; set; }
        public string Extension { get; set; }
        public int SizeBytes { get; set; }
    }
}
