using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Request
{
    public record struct GetFolderByIdRequest(
        int Id, 
        string Name, 
        string Description);

}
