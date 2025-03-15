using FileManagement.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Entities
{
    public class File : AuditableBaseEntity
    {
        public int FileName { get; set; }
        public string Extension { get; set; }
        public int SizeBytes { get; set; }
        public int IdFolder { get; set; }
        public Folder Folder { get; set; }
    }
}
