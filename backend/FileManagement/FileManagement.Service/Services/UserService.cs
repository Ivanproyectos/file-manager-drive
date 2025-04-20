using AutoMapper;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;
using Google.Apis.Drive.v3.Data;
using MediatR;

namespace FileManagement.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordService _passwordService;
        public UserService(IUserRepository userRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IPasswordService passwordService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _passwordService = passwordService;
        }
        public async Task DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
                throw new KeyNotFoundException($"usuario con el id {id} no existe");

            await _userRepository.DeleteUserAsync(user);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<List<UserDto>> GetAllUsers(string? email, string? identification)
        {
            var users = await _userRepository.GetAllUsersAsync(email, identification);
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<List<UserSummaryResponse>> GetAllUserSummaryAsync()
        {
            var users = await _userRepository.GetAllUsersActiveAsync();
            return _mapper.Map<List<UserSummaryResponse>>(users);
        }

        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
                    throw new KeyNotFoundException($"usuario con el id {id} no existe");
            return _mapper.Map<UserDto>(user);
        }

        public async Task ResetPasswordAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                throw new KeyNotFoundException($"usuario con el id {id} no existe");
            }

            user.PasswordHash = _passwordService.HashPassword(user.People.Identification);

            await _userRepository.UpdateUserAsync(user);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateStatusAsync(int id)
        {
            await _userRepository.UpdateStatusAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
