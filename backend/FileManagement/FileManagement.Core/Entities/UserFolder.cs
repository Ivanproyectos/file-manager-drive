using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Entities
{
    public class UserFolder
    {
        public int IdFolder { get; set; }
        public int IdUser { get; set; }

        public Folder Folder { get; set; }
        public User User { get; set; }
    }
}
