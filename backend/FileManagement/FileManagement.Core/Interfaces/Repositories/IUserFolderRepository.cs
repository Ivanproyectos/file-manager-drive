using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IUserFolderRepository
    {
        Task<List<UserFolder>> GetFolderAsync(int FolderId);
        Task<List<UserFolder>> GerUserFolderByUserIdAsync(int UserId);
        Task<List<UserFolder>> GerUserFolderByFolderIdAsync(int FolderId);
        Task AddUserFolder(UserFolder userFolder);
        Task AddRangeUsersFolder(List<UserFolder> usersFolder);

        Task RemoveUserFolderRangeASync(List<UserFolder> userFolder);
    }
}
