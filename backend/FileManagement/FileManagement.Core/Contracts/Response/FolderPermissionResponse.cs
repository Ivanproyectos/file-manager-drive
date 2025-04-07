using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Response
{
    public record struct FolderPermissionResponse(
        int Id,
        string name,
        string email,
        int UserId,
        int FolderId,
        bool CanView,
        bool IsDateExpired,
        bool CanDownload,
        DateTime? ExpirationDate
    );
}
