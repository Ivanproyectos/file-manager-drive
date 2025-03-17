using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Contracts.Response;
using FileManagement.Core.Exceptions;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;
using MediatR;

namespace FileManagement.Service.UseCases
{
    public class LoginUseCase : IRequestHandler<LoginRequest, LoginResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordService _passwordService;
        private readonly ITokenService _tokenService;
        private readonly IUserRoleRepository _userRoleRepository; 
        public LoginUseCase(IUserRepository userRepository,
            IPasswordService passwordService,
            ITokenService tokenService,
            IUserRoleRepository userRoleRepository)
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
            _tokenService = tokenService;
            _userRoleRepository = userRoleRepository;
        }
        public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserByEmailAsync(request.Email);

            if (user == null) {
                throw new UnauthorizedException($"El usuario con el email {request.Email} no existe");
            }
            if (!_passwordService.VerifyPassword(user.PasswordHash, request.Password))
            {
                throw new UnauthorizedException("Contraseña incorrecta");
            }

            var roles = await _userRoleRepository.GetUserRolesAsync(user.Id);

            var roleNames = roles.Select(x => x.Role.RoleName).ToList();

            var tokenDto = await _tokenService.GenerateToken(user.Id, roleNames);
            
            return new LoginResponse { Token = tokenDto.Token, ExpiresIn = tokenDto.ExpiresIn };


        }
    }
}
