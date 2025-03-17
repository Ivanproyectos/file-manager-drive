using FileManagement.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Entities
{
    public class Role: AuditableBaseEntity
    {
        public string RoleName { get; set; }
        public string Description { get; set; }
        //public ICollection<UserRole> UserRoles { get; set; }

        public ICollection<RoleModule> RoleModules { get; set; }
    }
}
