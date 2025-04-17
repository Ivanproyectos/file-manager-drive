using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Request
{
    public record struct ChangeStatusRequest(
        int FolderId,
        int StatusId,
        string Comment
    );

}
