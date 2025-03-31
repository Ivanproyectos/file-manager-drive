using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Response
{
    public record struct UserFolderResponse(
        int Id, 
        string Name);
}
