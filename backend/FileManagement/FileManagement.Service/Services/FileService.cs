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
        private readonly IGoogleDriveService _googleDriveService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public FileService(IFileRepository fileRepository,
            IMapper mapper,
            IFilePermissionRepository filePermissionRepository,
            ITokenService tokenService,
            IGoogleDriveService googleDriveService,
            IUnitOfWork unitOfWork)
        {
            _fileRepository = fileRepository;
            _mapper = mapper;
            _filePermissionRepository = filePermissionRepository;
            _tokenService = tokenService;
            _googleDriveService = googleDriveService;
            _unitOfWork = unitOfWork;
        }

        public async Task<Stream> DownloadFile(string FileId)
        {
            var stream = await _googleDriveService.DownloadFileAsync(FileId); 
            return stream;
            //string directory = Path.Combine(Path.GetTempPath(), "donwloads");
            //string path = Path.Combine(directory, $"{file.FileName}");

            //if (!Directory.Exists(directory))
            //{
            //    Directory.CreateDirectory(directory);
            //}

            //using (var fileStream = new FileStream(path, FileMode.Create, FileAccess.Write))
            //{
            //    await stream.CopyToAsync(fileStream);
            //}
        }

        public async Task<List<UserFileDto>> GetFilesByFolderIdAsync(int FolderId)
        {
           var decodedToken = _tokenService.DecodeToken();
           var files = await _fileRepository.GetFilesWithPermissionsAsync(FolderId, decodedToken.UserId);
            return _mapper.Map<List<UserFileDto>>(files);
        }
        public async Task DeleteFileAsync(int FileId)
        {
            var user = await _fileRepository.GetFileByIdAsync(FileId);
            await _fileRepository.DeleteFileAsync(user);

            await _unitOfWork.SaveChangesAsync();

            _googleDriveService.DeleteFile(user.FileStorage.StorageIdentifier);
        }
    }
}
