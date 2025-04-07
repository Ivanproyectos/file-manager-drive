using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Request
{
    public record struct UpdateFolderPermissionRequest(
        int Id,
        int UserId,
        int FolderId,
        bool CanView,
        bool IsDateExpired,
        bool CanDownload,
        DateTime? ExpirationDate
        );

}
