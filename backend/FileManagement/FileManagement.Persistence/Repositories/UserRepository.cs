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
             user.DeletedAt = DateTime.Now;
            _context.Users.Update(user);
            return Task.FromResult(user);
        }

        public Task<List<User>> GetAllUsersActiveAsync()
        {
            return _context.Users.Include(u => u.People).Where(u => u.Status == true).ToListAsync();
        }

        public Task<List<User>> GetAllUsersAsync()
        {
            return _context.Users.Include(u => u.People)
                .Select(u => new User { 
                    Id = u.Id, 
                    UserName = u.UserName, 
                    Status = u.Status,
                    People = new People {
                        Id = u.People.Id, 
                        FirstName = u.People.FirstName, 
                        LastName = u.People.LastName,
                        Email = u.People.Email,
                        Phone = u.People.Phone, 
                        Identification = u.People.Identification,
                        CreatedAt = u.People.CreatedAt,
                        PersonType = u.People.PersonType
                    } 
                })
                .ToListAsync();
        }

        public Task<User?> GetUserByEmailAsync(string email)
        {
          return _context.Users.FirstOrDefaultAsync(u => u.People.Email == email);
        }

        public async Task<User?> GetUserByIdAsync(int userId)
        {
            return await _context.Users.Include(u => u.People).FirstOrDefaultAsync(u => u.Id == userId);
        }

        public Task<User?> GetUserByUsernameAsync(string UserName)
        {
            return _context.Users.FirstOrDefaultAsync(u => u.UserName == UserName);
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
