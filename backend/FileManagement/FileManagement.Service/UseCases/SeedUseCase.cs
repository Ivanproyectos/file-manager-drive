using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Service.UseCases
{

    public class SeedUseCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordService _passwordService;
        private readonly IUnitOfWork _unitOfWork;
        public SeedUseCase(IUserRepository userRepository, IPasswordService passwordService, IUnitOfWork unitOfWork)
        {
            _passwordService = passwordService;
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task Execute()
        {
            var user = await _userRepository.GetUserByUsernameAsync("admin");
            string passwordHash = _passwordService.HashPassword("admin");

            user.PasswordHash = passwordHash;
            await _userRepository.UpdateUserAsync(user);
            await _unitOfWork.SaveChangesAsync();

        }
    }
}
