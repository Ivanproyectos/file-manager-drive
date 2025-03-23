using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class StorageProvider : AuditableBaseEntity
    {
        public string ProviderName { get; set; }
        public string Description { get; set; }
        public IEnumerable<FileStorage> FileStorages { get; set; }
    }
}
