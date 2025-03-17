using FileManagement.Core.Contracts.Dtos;
using System.Security.Claims;

namespace FileManagement.Core.Interfaces.Services
{
    public interface ITokenService
    {
        UserTokenDto DecodeToken();
        Task<TokenDto> GenerateToken(int userId, List<string> roles);
        ClaimsPrincipal? ValidateToken(string token);
    }
}
