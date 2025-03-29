using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Dtos
{
    public record struct UserFolderDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
    };

}
