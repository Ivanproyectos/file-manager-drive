using FileManagement.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Entities
{
    public class UserFolder : AuditableBaseEntity
    {
        public int FolderId { get; set; }
        public int UserId { get; set; }

        public Folder Folder { get; set; }
        public User User { get; set; }
    }
}
