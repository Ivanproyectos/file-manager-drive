using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Request;

namespace FileManagement.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task DeleteUserAsync(int Id);
        Task<List<UserDto>> GetAllUsers(); 
         Task<UserDto> GetUserByIdAsync(int Id);
        Task<List<UserSummaryResponse>> GetAllUserSummaryAsync();
        Task UpdateStatusAsync(int Id);
    }
}
