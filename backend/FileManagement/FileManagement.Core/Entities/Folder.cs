using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class Folder : AuditableBaseEntity
    {
        public string Name { get; set; }
        public int? ParentFolderId { get; set; }
        public Folder ParentFolder { get; set; } // Referencia a la carpeta padre
        public ICollection<Folder> SubFolders { get; set; } // Hijos de la carpeta

        public ICollection<UserFolder> UserFolders { get; set; }

        public ICollection<File> Files { get; set; }

        public IEnumerable<FolderPermission> FolderPermissions { get; set; }

    }
}
