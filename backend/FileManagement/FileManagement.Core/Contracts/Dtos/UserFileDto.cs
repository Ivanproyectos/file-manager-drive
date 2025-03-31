namespace FileManagement.Core.Contracts.Dtos
{
    public record struct UserFileDto
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string Extension { get; set; }
        public DateTime CreatedDate { get; set; }
        public int SizeBytes { get; set; }
        public bool CanView { get; set; }
        public bool CanDownload { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
