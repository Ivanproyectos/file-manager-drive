using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class FilePermission : AuditableBaseEntity
    {
        public int UserId { get; set; }
        public int FileId { get; set; }
        public bool CanView { get; set; } = true;
        public bool CanDownload { get; set; }

        public User User { get; set; }
        public File File { get; set; }
    }
}
