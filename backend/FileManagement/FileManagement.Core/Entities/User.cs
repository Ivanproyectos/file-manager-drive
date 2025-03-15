using FileManagement.Core.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Entities
{
    public class User : AuditableBaseEntity
    {
        public int IdPerson { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public bool Status { get; set; } = true;
        public People People { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<UserFolder> UserFolders { get; set; }
        public User CreatedByUser { get; set; }
        public User UpdatedByUser { get; set; }
    }
}
