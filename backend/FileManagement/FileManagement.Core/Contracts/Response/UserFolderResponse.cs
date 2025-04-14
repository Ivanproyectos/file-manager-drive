using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileManagement.Core.Contracts.Dtos;

namespace FileManagement.Core.Contracts.Response
{
    public record struct UserFolderResponse(
        int Id, 
        string Name,
        List<FolderProcessHistoryDto> FolderProcessHistories
        );
}
