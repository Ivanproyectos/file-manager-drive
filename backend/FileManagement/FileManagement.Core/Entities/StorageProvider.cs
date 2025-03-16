using FileManagement.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Entities
{
    public class StorageProvider : AuditableBaseEntity
    {
        public string ProviderName { get; set; }
        public string Description { get; set; }
        public IEnumerable<FileStorage> FileStorages { get; set; }
    }
}
