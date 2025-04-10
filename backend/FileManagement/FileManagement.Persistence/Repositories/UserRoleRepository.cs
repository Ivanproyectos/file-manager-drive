using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace FileManagement.Persistence.Repositories
{
    public class UserRoleRepository : IUserRoleRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRoleRepository(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }
        public void AddUserRolesAsync(UserRole userRole)
        {
            throw new NotImplementedException();
        }


        public async Task<List<UserRole>> GetUserRolesAsync(int userId)
        {
            return await _context.UserRoles.Include(x => x.Role).Where(x => x.UserId == userId).ToListAsync();
        }

        public Task RemoveUserRolesRangeAsync(List<UserRole> userRoles)
        {
            _context.UserRoles.RemoveRange(userRoles);
            return Task.CompletedTask;
        }
    }
}
