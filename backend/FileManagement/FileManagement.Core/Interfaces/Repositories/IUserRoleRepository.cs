using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IUserRoleRepository
    {
        Task<List<UserRole>> GetUserRolesAsync(int userId);
        void AddUserRolesAsync(UserRole userRole);
    }
}
