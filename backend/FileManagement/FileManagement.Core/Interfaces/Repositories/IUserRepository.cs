using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        //Task<User?> GetUserByUsernameAsync(string UserName);
        //Task<bool> UserExists(string userName);
        Task<List<User>> GetAllUsersAsync(string? email, string? identification);
        Task<List<User>> GetAllUsersActiveAsync();
        Task<User?> GetUserByIdAsync(int userId);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task UpdateStatusAsync(int userId);
        Task DeleteUserAsync(User user);

    }
}
