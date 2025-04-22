using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;
using MediatR;

namespace FileManagement.Service.UseCases
{
    public class DeleteFolderUseCase : IRequestHandler<DeleteFolderRequest, Unit>
    {
        private readonly IFolderRepository _folderRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGoogleDriveService _googleDriveService;
        private readonly ILoggerService _loggerService;


        public DeleteFolderUseCase(
            IFolderRepository folderRepository,
            IFileRepository fileRepository,
            IUnitOfWork unitOfWork,
            IGoogleDriveService googleDriveService,
            ILoggerService logger
            )
        {
            _folderRepository = folderRepository;
            _unitOfWork = unitOfWork;
            _googleDriveService = googleDriveService;
            _loggerService = logger;

        }
        public async Task<Unit> Handle(DeleteFolderRequest request, CancellationToken cancellationToken)
        {
            var folder = await _folderRepository.GetFolderByIdAsync(request.FolderId);
            if (folder == null)
            {
                throw new KeyNotFoundException($"El folder con el id {request.FolderId} no existe");
            }

            await DeleteFolderAndSubfoldersAsync(folder, cancellationToken);

            await _folderRepository.DeleteFolderAsync(folder);
            await _unitOfWork.SaveChangesAsync();

            return Unit.Value;
        }

        private async Task DeleteFolderAndSubfoldersAsync(Folder folder, CancellationToken cancellationToken)
        {
            DeleteFilesFromDriveAsync(folder?.Files);

            await _folderRepository.DeleteFolderAsync(folder);
            if (folder.SubFolders == null) return;

            foreach (var subfolder in folder.SubFolders)
            {
                if (cancellationToken.IsCancellationRequested)
                    break;

                await DeleteFolderAndSubfoldersAsync(subfolder, cancellationToken);
            }
        }

        private void DeleteFilesFromDriveAsync(ICollection<Core.Entities.File> files)
        {
            if (files == null || files.Count == 0) return;

            Task.Run(async () =>
            {
                try
                {
                    var deleteFileStorageTasks = files.Select(file => 
                    _googleDriveService.DeleteFileAsync(file.FileStorage.StorageIdentifier));
                   
                    await Task.WhenAll(deleteFileStorageTasks);

                }
                catch (Exception ex)
                {
                    _loggerService.LogError("Error al eliminar archivos de drive", ex);
                }
            });
        }
    }
}
