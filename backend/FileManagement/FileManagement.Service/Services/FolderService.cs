using AutoMapper;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;

namespace FileManagement.Service.Services
{
    public class FolderService : IFolderService
    {
        private readonly IFolderRepository _folderRepository;
        private readonly IFolderProcessHistoryRepository _folderProcessHistoryRepository;
        private readonly IUserFolderRepository _userFolderRepository;
        private readonly IFileRepository _fileRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGoogleDriveService _googleDriveService;
        private readonly IFolderProcessStateRepostory _folderProcessStateRepostory;
      
        public FolderService(
            IFolderRepository folderRepository,
            IUserFolderRepository userFolderRepository,
            IFileRepository fileRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IGoogleDriveService googleDriveService,
            IFolderProcessHistoryRepository folderProcessHistoryRepository,
            IFolderProcessStateRepostory folderProcessStateRepostory,
            IFileUploadConfigurationRepository fileUploadConfigurationRepository)
        {
            _folderRepository = folderRepository;
            _userFolderRepository = userFolderRepository;
            _fileRepository = fileRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _googleDriveService = googleDriveService;
            _folderProcessHistoryRepository = folderProcessHistoryRepository;
            _folderProcessStateRepostory = folderProcessStateRepostory;
        }
        public async Task<List<FolderDto>> GetAllFoldersAsync(string? folderName)
        {
            var folders = await _folderRepository.GetFoldersAsync(folderName);
            var foldersDto = _mapper.Map<List<FolderDto>>(folders);
            return foldersDto;
        }


        public async Task<List<FileDto>> GetFolderFiles(int folderId)
        {
            var files = await _fileRepository.GetFilesByFolderIdAsync(folderId);
            return _mapper.Map<List<FileDto>>(files);
        }
     
        public async Task<List<SubFolderDto>> GetSubFoldersAsync(int FolderId)
        {
            var subFolders = await _folderRepository.GetSubFoldersAsync(FolderId);
            var subFoldersDto = subFolders.Select(subFolder => new SubFolderDto {
                Id = subFolder.Id, 
                Name = subFolder.Name, 
                ParentId = subFolder.ParentFolderId,
            }).ToList();
            return subFoldersDto;
        }

        public async Task UpdateStatus(int folderId)
        {
            var folder = await _folderRepository.GetFolderByIdAsync(folderId);
            if (folder == null)
            {
                throw new KeyNotFoundException($"El folder con el id {folderId} no existe");
            }

            await _folderRepository.UpdateStatusAsync(folder);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ChangeProcessStatus(ChangeStatusRequest request)
        {
            var folderHistories = await _folderProcessHistoryRepository.GetHistoriesAsync(request.FolderId);
            if (folderHistories.Count == 0)
            {
                throw new KeyNotFoundException($"El folder con el id {request.FolderId} no existe");
            }

            var updatedFolderHistory = folderHistories
                .Select(x =>
                {
                    x.IsActive = false;
                    return x;
                }).ToList();
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                await _folderProcessHistoryRepository.UpdateStatusActiveAsync(updatedFolderHistory);

                var folderHistory = new FolderProcessHistory
                {
                    FolderId = request.FolderId,
                    FolderProcessStateId = request.StatusId,
                    Comment =  request.Comment,
                    IsActive = true
                };
                await _folderProcessHistoryRepository.CreateAsync(folderHistory);

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                await  _unitOfWork.RollbackAsync();
                throw ex;
            }
            
        }

        public async Task<GetFolderByIdRequest> GetFolderByIdAsync(int folderId)
        {
            var folder = await _folderRepository.GetFolderByIdAsync(folderId);
            return new GetFolderByIdRequest(folder.Id, folder.Name, folder.Description);
            
        }

        public async Task<List<FolderProcessState>> GetFolderProcessStatesAsync()
        {
            return await _folderProcessStateRepostory.GetFolderProcessStateAsync();
        }

       
    }
}
