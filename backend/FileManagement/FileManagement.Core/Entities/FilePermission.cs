using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class FilePermission : AuditableBaseEntity
    {
        public int IdUser { get; set; }
        public int IdFile { get; set; }
        public bool CanView { get; set; } = true;
        public bool CanDownload { get; set; }

        public User User { get; set; }
        public File File { get; set; }
    }
}
