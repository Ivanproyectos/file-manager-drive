using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace FileManagement.Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public async Task<User?> AddUserAsync(User user)
        {
           var result = await _context.Users.AddAsync(user);
            return result.Entity;
        }

        public Task DeleteUserAsync(User user)
        {
             user.DeletedAt = DateTime.Now;
            _context.Users.Update(user);
            return Task.FromResult(user);
        }

        public Task<List<User>> GetAllUsersAsync()
        {
            return _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }

        public Task  UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            return Task.CompletedTask;
        }

        public Task<bool> UserExists(string userName)
        {
            return _context.Users.AnyAsync(u => u.UserName == userName);
        }
    }
}
