using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class FileTemp : AuditableBaseEntity
    {
        public string FileName { get; set; }
        public required string Extension { get; set; }
        public string MimeType { get; set; }
        public long SizeBytes { get; set; }
        public int FolderId { get; set; }
        public string UploadId  { get; set; }
        public string StorageIdentifier { get; set; }

    }
}
