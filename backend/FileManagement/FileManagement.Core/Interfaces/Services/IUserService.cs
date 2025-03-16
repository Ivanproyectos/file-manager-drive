using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task DeleteUser(int Id);
        Task<List<User>> GetAllUsers(); 
         Task<User> GetUserById(int Id);
    }
}
