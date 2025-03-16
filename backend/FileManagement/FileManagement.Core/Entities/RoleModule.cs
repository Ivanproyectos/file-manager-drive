using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class RoleModule : AuditableBaseEntity
    {
        public int IdRole { get; set; }
        public int IdModule { get; set; }
        public Role Role { get; set; }
        public Module Module { get; set; }
    }
}
