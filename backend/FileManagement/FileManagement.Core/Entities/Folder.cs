using FileManagement.Core.Common;
using FileManagement.Core.Contracts.Dtos;

namespace FileManagement.Core.Entities
{
    public class Folder : AuditableBaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentFolderId { get; set; }
        public Folder ParentFolder { get; set; }
        public bool Status { get; set; }
        //public ICollection<Folder> SubFolders { get; set; } // Hijos de la carpeta

        public ICollection<UserFolder> UserFolders { get; set; }

        public ICollection<File> Files { get; set; }

        //public IEnumerable<FolderPermission> FolderPermissions { get; set; }

    }
}
