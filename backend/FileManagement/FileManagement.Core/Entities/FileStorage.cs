using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class FileStorage : AuditableBaseEntity
    {
        public int IdFile { get; set; }
        public int IdStorageProvider { get; set; }
        public string StorageIdentifier { get; set; }
        public string StoragePath { get; set; }
        public DateTime UploadedAt { get; set; } = DateTime.Now;
        public StorageProvider StorageProvider { get; set; }
    }
}
