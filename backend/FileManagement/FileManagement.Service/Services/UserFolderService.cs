using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Service.Services
{
    public class UserFolderService : IUserFolderService
    {
        private readonly IUserFolderRepository _userFolderRepository;
        private readonly ITokenService _tokenService;

        public UserFolderService(IUserFolderRepository userFolderRepository, ITokenService tokenService)
        {
            _userFolderRepository = userFolderRepository;
            _tokenService = tokenService;
        }
        public async Task<List<UserFolder>> GerUserFolderByFolderIdAsync(int FolderId)
        {
            return await _userFolderRepository.GerUserFolderByFolderIdAsync(FolderId);
        }

        public async Task<List<UserFolder>> GerUserFolderByUserIdAsync(int UserId)
        {
            var userToken =  _tokenService.DecodeToken();
            return await _userFolderRepository.GerUserFolderByUserIdAsync(userToken.Id);
        }
    }
}
