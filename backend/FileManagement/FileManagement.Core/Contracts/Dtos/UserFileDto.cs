namespace FileManagement.Core.Contracts.Dtos
{
    public record struct UserFileDto
    {
        public string FileName { get; set; }
        public string Extension { get; set; }
        public int SizeBytes { get; set; }
        public bool CanView { get; set; }
        public bool CanDownload { get; set; }
        public string ExpirationDate { get; set; }
    }
}
