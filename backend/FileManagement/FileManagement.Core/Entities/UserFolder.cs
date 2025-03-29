using FileManagement.Core.Common;

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
