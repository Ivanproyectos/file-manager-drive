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
        public FolderService(
            IFolderRepository folderRepository, 
            IUserFolderRepository userFolderRepository,
            IFileRepository fileRepository)
        {
            _folderRepository = folderRepository;
            _userFolderRepository = userFolderRepository;
            _fileRepository = fileRepository;
        }
        public async Task<List<FolderDto>> getAllFolders()
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
    }
}
