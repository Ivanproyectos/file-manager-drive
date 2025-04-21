using FileManagement.Core.Contracts.Dtos;
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
        private readonly IPeopleRepository _peopleRepository;
        public LoginUseCase(IUserRepository userRepository,
            IPasswordService passwordService,
            ITokenService tokenService,
            IUserRoleRepository userRoleRepository,
            IPeopleRepository peopleRepository)
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
            _tokenService = tokenService;
            _userRoleRepository = userRoleRepository;
            _peopleRepository = peopleRepository;
        }
        public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var people = await _peopleRepository.GetPeopleByIdentificationAsync(request.Email);

            if (people == null) {
                throw new UnauthorizedException($"El usuario con la identificacion {request.Email} no existe");
            }

            if (people.User.IsExpired && people.User.ExpirationDate < DateTime.Now.Date)
            {
                throw new UnauthorizedException("El usuario ha caducado");
            }

            if (!_passwordService.VerifyPassword(people.User.PasswordHash, request.Password))
            {
                throw new UnauthorizedException("Contraseña incorrecta");
            }

            var userInfo = await _userRepository.GetUserByIdAsync(people.User.Id);

            var roles = await _userRoleRepository.GetUserRolesAsync(people.User.Id);

            var roleNames = roles.Select(x => x.Role.RoleName)
                .ToList();

            var userDto = new GeneratTokenDto
            {
                Id = userInfo.Id,
                Email = userInfo.People.Email,
                Roles = roleNames
            };

            var tokenDto = await _tokenService.GenerateToken(people.User.Id, userDto);
            
            return new LoginResponse { 
                UserId = people.User.Id,
                Token = tokenDto.Token,
                ExpiresIn = tokenDto.ExpiresIn 
            };


        }
    }
}
