using AutoMapper;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;

namespace FileManagement.Service.Services
{
    public class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        private readonly IFilePermissionRepository _filePermissionRepository;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public FileService(IFileRepository fileRepository,
            IMapper mapper,
            IFilePermissionRepository filePermissionRepository,
            ITokenService tokenService)
        {
            _fileRepository = fileRepository;
            _mapper = mapper;
            _filePermissionRepository = filePermissionRepository;
            _tokenService = tokenService;
        }
        public async Task<List<FileDto>> GetFilesByFolderIdAsync(int FolderId)
        {
           var decodedToken = _tokenService.DecodeToken();
           var files = await _fileRepository.GetFilesWithPermissionsAsync(FolderId, decodedToken.UserId);
            return _mapper.Map<List<FileDto>>(files);
        }
    }
}
