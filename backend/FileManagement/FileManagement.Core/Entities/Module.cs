using FileManagement.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Entities
{
    public class Module : AuditableBaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentModuleId { get; set; }
        public string UrlPath { get; set; }
        public string Icon { get; set; }
        public int Order { get; set; }
        public virtual Module ParentModule { get; set; }
        public virtual ICollection<Module> SubModules { get; set; }
        public ICollection<RoleModule> RoleModules { get; set; }

    }
}
