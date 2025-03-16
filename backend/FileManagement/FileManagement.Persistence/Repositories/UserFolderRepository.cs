using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;

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
            await _context.AddRangeAsync(usersFolder);
        }

        public async Task AddUserFolder(UserFolder userFolder)
        {
            await _context.AddAsync(userFolder);
        }
    }
}
