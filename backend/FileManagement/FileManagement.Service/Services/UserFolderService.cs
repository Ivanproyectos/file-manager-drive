using AutoMapper;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Response;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;

namespace FileManagement.Service.Services
{
    public class UserFolderService : IUserFolderService
    {
        private readonly IUserFolderRepository _userFolderRepository;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public UserFolderService(IUserFolderRepository userFolderRepository, 
            ITokenService tokenService, IMapper mapper)
        {
            _userFolderRepository = userFolderRepository;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        public async Task<List<SubFolderDto>> GetUserSubFolderAsync(int FolderId)
        {
            var decodedToken = _tokenService.DecodeToken();

            var userFolders = await _userFolderRepository.GerUserFolderByFolderIdAsync(decodedToken.UserId, FolderId);
            var folders = userFolders.Select(x => x.Folder).ToList();
            return _mapper.Map<List<SubFolderDto>>(folders);
        }

        public async Task<List<UserFolderResponse>> GerUserFolderAsync()
        {
            var decodedToken =  _tokenService.DecodeToken();
            var userFolders = await _userFolderRepository.GerUserFolderByUserIdAsync(decodedToken.UserId);
            var folders = userFolders.Select(x => x.Folder).ToList();
            return _mapper.Map<List<UserFolderResponse>>(folders);
        }
    }
}
