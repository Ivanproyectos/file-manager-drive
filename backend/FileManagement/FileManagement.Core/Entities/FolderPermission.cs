using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class FolderPermission : AuditableBaseEntity
    {
        public int UserId { get; set; }
        public int FolderId { get; set; }
        public bool CanView { get; set; } = true;
        public bool CanDownload { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public User User { get; set; }
        public Folder Folder { get; set; }

    }
}
