using FileManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IUserFolderRepository
    {
        Task<List<UserFolder>> GerUserFolderByUserIdAsync(int UserId);

        Task<List<UserFolder>> GerUserFolderByFolderIdAsync(int FolderId);
        Task AddUserFolder(UserFolder userFolder);
        Task AddRangeUsersFolder(List<UserFolder> usersFolder);
    }
}
