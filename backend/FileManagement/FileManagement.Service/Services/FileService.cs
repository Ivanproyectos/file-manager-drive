using AutoMapper;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;

namespace FileManagement.Service.Services
{
    public class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        private readonly IMapper _mapper;
        public FileService(IFileRepository fileRepository, IMapper mapper)
        {
            _fileRepository = fileRepository;
            _mapper = mapper;
        }
        public async Task<List<FileDto>> GetFilesByFolderIdAsync(int FolderId)
        {
           var files = await _fileRepository.GetFilesByFolderIdAsync(FolderId);
            return _mapper.Map<List<FileDto>>(files);
        }
    }
}
