using AutoMapper;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;
using FileManagement.Service.Helpers;

namespace FileManagement.Service.Services
{
    public class FolderService : IFolderService
    {
        private readonly IFolderRepository _folderRepository;
        private readonly IUserFolderRepository _userFolderRepository;
        private readonly IFileRepository _fileRepository;
        private readonly IMapper _mapper;
        public FolderService(
            IFolderRepository folderRepository, 
            IUserFolderRepository userFolderRepository,
            IFileRepository fileRepository,
            IMapper mapper)
        {
            _folderRepository = folderRepository;
            _userFolderRepository = userFolderRepository;
            _fileRepository = fileRepository;
             _mapper = mapper;
        }
        public async Task<List<FolderDto>> GetAllFoldersAsync()
        {
            var folders = await _folderRepository.GetFoldersAsync();

            var folderDtos = folders.Select(folder => new FolderDto
            {
                Id = folder.Id,
                Name = folder.Name,
                CreatedDate = folder.CreatedAt,
                Users = folder.UserFolders.Select(userFolder => new UserFolderDto
                {
                    Name = FormatPeopleName.FormatPeopleType(userFolder.User.People),
                    Email = userFolder.User.People.Email
                }).ToList(),
                Size = folder.Files.Select(file => file.SizeBytes).Distinct().Sum()
            }).ToList();

            return folderDtos;
        }

        public async Task<List<FileDto>> GetFolderFiles(int folderId)
        {
            var files = await _fileRepository.GetFilesByFolderIdAsync(folderId);
            return _mapper.Map<List<FileDto>>(files);
        }

        public async Task<List<SubFolderDto>> GetSubFoldersAsync(int FolderId)
        {
            var subFolders = await _folderRepository.GetSubFoldersAsync(FolderId);
            var subFolderDtos = subFolders.Select(subFolder => new SubFolderDto {
                Id = subFolder.Id, 
                Name = subFolder.Name, 
                ParentId = subFolder.ParentFolderId,
            }).ToList();
            return subFolderDtos;
        }
    }
}
