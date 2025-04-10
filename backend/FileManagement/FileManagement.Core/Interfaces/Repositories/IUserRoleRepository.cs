using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IUserRoleRepository
    {
        Task<List<UserRole>> GetUserRolesAsync(int userId);
        Task RemoveUserRolesRangeAsync(List<UserRole> userRoles);
        void AddUserRolesAsync(UserRole userRole);
    }
}
