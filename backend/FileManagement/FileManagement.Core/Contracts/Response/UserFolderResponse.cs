using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Request;

namespace FileManagement.Core.Contracts.Response
{
    public class UserFolderResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<FolderProcessHistoryDto> FolderProcessHistories { get; set; }
        public FolderPermissionResponse FolderPermissions { get; set; }
    }
}
