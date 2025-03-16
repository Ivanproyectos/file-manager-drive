using FileManagement.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Entities
{
    public class UserRole: AuditableBaseEntity
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }

        // 🔗 Relaciones con User y Role
        public User User { get; set; }
        public Role Role { get; set; }
    }
}
