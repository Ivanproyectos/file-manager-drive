using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Entities;
using System.Security.Claims;

namespace FileManagement.Core.Interfaces.Services
{
    public interface ITokenService
    {
        UserTokenDto DecodeToken();
        Task<TokenDto> GenerateToken(int userId, UserDto user);
        ClaimsPrincipal? ValidateToken(string token);
    }
}
