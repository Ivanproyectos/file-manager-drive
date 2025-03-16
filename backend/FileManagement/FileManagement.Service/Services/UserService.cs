using AutoMapper;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;

namespace FileManagement.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task DeleteUser(int Id)
        {
            var user = await _userRepository.GetUserByIdAsync(Id);
            if (user == null)
                throw new KeyNotFoundException($"usuario con el id {Id} no existe");

            await _userRepository.DeleteUserAsync(user);
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<User> GetUserById(int Id)
        {
            var user = await _userRepository.GetUserByIdAsync(Id);
            if (user == null)
                if (user == null)
                    throw new KeyNotFoundException($"usuario con el id {Id} no existe");

            return await _userRepository.GetUserByIdAsync(Id);
        }
    }
}
