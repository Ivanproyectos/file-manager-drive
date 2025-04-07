using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace FileManagement.Persistence.Repositories
{
    public class UserFolderRepository : IUserFolderRepository
    {

        private readonly ApplicationDbContext _context;
        public UserFolderRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public async Task AddRangeUsersFolder(List<UserFolder> usersFolder)
        { 
            if(usersFolder == null || usersFolder.Count == 0) return;

            await _context.AddRangeAsync(usersFolder);
        }

        public async Task AddUserFolder(UserFolder userFolder)
        {
            await _context.AddAsync(userFolder);
        }

        public async Task<List<UserFolder>> GetFolderAsync(int FolderId)
        {
            return await _context.UserFolders.Include(uf => uf.User)
                   .Where(uf => uf.FolderId == FolderId).ToListAsync();
        }

        public async Task<List<UserFolder>> GerUserFolderByFolderIdAsync(int UserId, int FolderId)
        {
            return await _context.UserFolders.Include(uf => uf.Folder)
                 .Where(uf => uf.Folder.ParentFolderId == FolderId && uf.UserId == UserId).ToListAsync();
        }

        public async Task<List<UserFolder>> GerUserFolderByUserIdAsync(int UserId)
        {
            return await _context.UserFolders.Include(uf => uf.Folder)
                .Where(uf => uf.UserId == UserId && uf.Folder.ParentFolderId == null).ToListAsync();
        }

        public Task RemoveUserFolderRangeASync(List<UserFolder> userFolders)
        {
            foreach (var folder in userFolders)
            {
                folder.DeletedAt = DateTime.UtcNow;
                _context.Update(folder);
            }
            return Task.CompletedTask;
        }
    }
}
