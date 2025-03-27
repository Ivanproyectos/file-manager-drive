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
        public async Task DeleteUserAsync(int Id)
        {
            var user = await _userRepository.GetUserByIdAsync(Id);
            if (user == null)
                throw new KeyNotFoundException($"usuario con el id {Id} no existe");

            await _userRepository.DeleteUserAsync(user);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<List<UserDto>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<List<UserSummaryResponse>> GetAllUserSummaryAsync()
        {
            var users = await _userRepository.GetAllUsersActiveAsync();
            return _mapper.Map<List<UserSummaryResponse>>(users);
        }

        public async Task<UserDto> GetUserByIdAsync(int Id)
        {
            var user = await _userRepository.GetUserByIdAsync(Id);
            if (user == null)
                    throw new KeyNotFoundException($"usuario con el id {Id} no existe");

            //var userDto = _mapper.Map<UserDto>(user);
            //userDto.Password = _passwordService.VerifyPassword(user.Password);

            return _mapper.Map<UserDto>(user);
        }

        public async Task UpdateStatusAsync(int Id)
        {
            await _userRepository.UpdateStatusAsync(Id);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
