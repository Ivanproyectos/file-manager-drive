using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Exceptions;
using FileManagement.Core.Interfaces.Services;
using FileManagement.Core.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FileManagement.Service.Services
{
    internal class TokenService : ITokenService
    {
        private readonly JwtSetting _jwtConfig;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TokenService(IOptions<JwtSetting> jwtConfig, 
            IHttpContextAccessor httpContextAccessor)
        {
            _jwtConfig = jwtConfig.Value;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<TokenDto> GenerateToken(int userId, UserDto user)
        {
     

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.SecretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var userRoles = new List<Claim>();
            foreach (var role in user.Roles)
            {
                userRoles.Add(new Claim("roles", role));
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email?? string.Empty),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
             }.Concat(userRoles);

            DateTime expires = DateTime.UtcNow.AddMinutes(_jwtConfig.ExpirationMinutes);

            var token = new JwtSecurityToken(
                issuer: _jwtConfig.Issuer,
                audience: _jwtConfig.Audience,
                claims: claims,
                expires: expires,
                signingCredentials: credentials
            );

            return new TokenDto(
                new JwtSecurityTokenHandler().WriteToken(token),
                new DateTimeOffset(expires).ToUnixTimeSeconds()
                );
        }
        public ClaimsPrincipal? ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtConfig.SecretKey);

            try
            {
                var parameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _jwtConfig.Issuer,
                    ValidAudience = _jwtConfig.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };

                var principal = tokenHandler.ValidateToken(token, parameters, out _);
                return principal;
            }
            catch
            {
                return null;
            }
        }
        public UserTokenDto DecodeToken()
        {
            var token = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            if(string.IsNullOrEmpty(token))
            {
                throw new UnauthorizedException("Usuario no autorizado");
            }

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            if (jsonToken != null)
            {
                // Accede a las reclamaciones del token
                var userId = jsonToken?.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
                var email = jsonToken?.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email)?.Value;

                return new UserTokenDto { Email = email, UserId = int.Parse(userId) };
            }
            return new UserTokenDto();
        }
    }
}
