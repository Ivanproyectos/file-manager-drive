using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class RoleModule : AuditableBaseEntity
    {
        public int RoleId { get; set; }
        public int ModuleId { get; set; }
        public Role Role { get; set; }
        public Module Module { get; set; }
    }
}
