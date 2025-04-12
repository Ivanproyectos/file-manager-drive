using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Request;

namespace FileManagement.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task DeleteUserAsync(int id);
        Task<List<UserDto>> GetAllUsers(); 
         Task<UserDto> GetUserByIdAsync(int id);
        Task<List<UserSummaryResponse>> GetAllUserSummaryAsync();
        Task UpdateStatusAsync(int id);
        Task ResetPasswordAsync(int id);
    }
}
