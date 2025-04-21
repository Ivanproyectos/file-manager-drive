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

        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            
        }

        public Task DeleteUserAsync(User user)
        {
            user.People.DeletedAt = DateTime.UtcNow;
            user.DeletedAt = DateTime.Now;
            _context.Users.Update(user);
            return Task.FromResult(user);
        }

        public Task<List<User>> GetAllUsersActiveAsync()
        {
            return _context.Users.Include(u => u.People).Where(u => u.Status == true).ToListAsync();
        }

        public Task<List<User>> GetAllUsersAsync(string? email, string? identification)
        {
            var query = _context.Users.Include(u => u.People).AsQueryable();

            if (!string.IsNullOrEmpty(email))
            {
                query = query.Where(u => u.People.Email.Contains(email));
            }

            if (!string.IsNullOrEmpty(identification))
            {
                query = query.Where(u => u.People.Identification.Contains(identification));
            }

            //return _context.Users.Include(u => u.People)
            //                   .ToListAsync();
            return query.ToListAsync();
        }

        public Task<User?> GetUserByEmailAsync(string email)
        {
          return _context.Users.FirstOrDefaultAsync(u => u.People.Email == email);
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await _context.Users
                .Include(x => x.Roles)
                .ThenInclude(r => r.Role)
                .Include(u => u.People)
                .FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task UpdateStatusAsync(int userId)
        {
            var user = await _context.Users.Include(u => u.People).FirstOrDefaultAsync(u => u.Id == userId);
            user.Status = !user.Status;
            _context.Users.Update(user);

        }

        //public Task<User?> GetUserByUsernameAsync(string UserName)
        //{
        //    return _context.Users.FirstOrDefaultAsync(u => u.UserName == UserName);
        //}

        public Task  UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            return Task.CompletedTask;
        }

        //public Task<bool> UserExists(string userName)
        //{
        //    return _context.Users.AnyAsync(u => u.UserName == userName);
        //}
    }
}
