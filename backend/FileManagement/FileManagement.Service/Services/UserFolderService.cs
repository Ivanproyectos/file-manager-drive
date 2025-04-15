using System.Runtime.Intrinsics.Arm;
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
        private readonly IFolderRepository _folderRepository;
        private readonly IFolderPermissionRepository _folderPermissionRepository;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public UserFolderService(
            IUserFolderRepository userFolderRepository,
            ITokenService tokenService,
            IMapper mapper,
            IFolderPermissionRepository folderPermissionRepository,
            IFolderRepository  folderRepository
        )
        {
            _userFolderRepository = userFolderRepository;
            _tokenService = tokenService;
            _mapper = mapper;
            _folderPermissionRepository = folderPermissionRepository;
            _folderRepository = folderRepository;
        }

        public async Task<List<SubFolderDto>> GetUserSubFolderAsync(int FolderId)
        {
            var decodedToken = _tokenService.DecodeToken();

            var userFolders = await _folderRepository.GetSubFoldersAsync(
                //decodedToken.UserId,
                FolderId
            );
            //var folders = userFolders.userFolders
            return _mapper.Map<List<SubFolderDto>>(userFolders);
        }

        public async Task<List<UserFolderResponse>> GerUserFolderAsync()
        {
            var decodedToken = _tokenService.DecodeToken();
            var userFolders = await _userFolderRepository.GerUserFolderByUserIdAsync(
                decodedToken.UserId
            );
            var userFolderPermissions =
                await _folderPermissionRepository.GetFolderPermissionsByUserIdAsync(
                    decodedToken.UserId
                );

            var folders = userFolders.Select(x => x.Folder).ToList();
            var foldersDto = _mapper.Map<List<UserFolderResponse>>(folders);

            foreach (var folderDto in foldersDto)
            {
                var folderPermission = userFolderPermissions.FirstOrDefault(fp =>
                    fp.FolderId == folderDto.Id && fp.UserId == decodedToken.UserId
                );

                folderDto.FolderPermissions = _mapper.Map<FolderPermissionResponse>(
                    folderPermission
                );
            }

            return foldersDto;
        }
    }
}
