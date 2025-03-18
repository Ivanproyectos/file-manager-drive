using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class File : AuditableBaseEntity
    {
        public int FileName { get; set; }
        public string Extension { get; set; }
        public int SizeBytes { get; set; }
        public int FolderId { get; set; }
        public Folder Folder { get; set; }

        //public IEnumerable<FilePermission> FilePermissions { get; set; }
    }
}
