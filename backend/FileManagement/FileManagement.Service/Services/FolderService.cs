using AutoMapper;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Exceptions;
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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGoogleDriveService _googleDriveService;
        public FolderService(
            IFolderRepository folderRepository,
            IUserFolderRepository userFolderRepository,
            IFileRepository fileRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IGoogleDriveService googleDriveService)
        {
            _folderRepository = folderRepository;
            _userFolderRepository = userFolderRepository;
            _fileRepository = fileRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _googleDriveService = googleDriveService;
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
        public async Task DeleteFolderAndFiles(int folderId)
        {
            var folder = await _folderRepository.GetFolderByIdAsync(folderId);
            if (folder == null)
            {
                throw new ValidationException("Folder not found");
            }

            var files = await _fileRepository.GetFilesByFolderIdAsync(folderId);
            var deleteTasks = files.Select(file =>
            {
                _googleDriveService.DeleteFile(file.FileStorage.StorageIdentifier);
                return _fileRepository.DeleteFileAsync(file);
            });
            var subFolders = await _folderRepository.GetSubFoldersAsync(folderId);

            await Task.WhenAll(deleteTasks);
            await _folderRepository.DeleteFolderRangeAsync(subFolders);
            await _folderRepository.DeleteFolderAsync(folder);
            await _unitOfWork.SaveChangesAsync();
  
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
