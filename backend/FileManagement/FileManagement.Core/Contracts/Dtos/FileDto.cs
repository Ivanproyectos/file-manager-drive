using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Dtos
{
    public record struct FileDto(
        int Id,
        string FileName, 
        string Extension, 
        long SizeBytes, 
        int FolderId,
        DateTime CreatedDate
        );

}
