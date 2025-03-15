using FileManagement.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Entities
{
    public class Folder : AuditableBaseEntity
    {
        public string Name { get; set; }
        public int ParentFolderId { get; set; }
        public Folder ParentFolder { get; set; } // Referencia a la carpeta padre
        public ICollection<Folder> SubFolders { get; set; } // Hijos de la carpeta

        public ICollection<UserFolder> UserFolders { get; set; }

        public ICollection<File> Files { get; set; }

    }
}
