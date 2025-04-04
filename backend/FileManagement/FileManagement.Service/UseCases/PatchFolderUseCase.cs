using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Exceptions;
using FileManagement.Core.Interfaces.Repositories;
using MediatR;

namespace FileManagement.Service.UseCases
{
    public class PatchFolderUseCase : IRequestHandler<PatchFolderRequest, Unit>
    {
        private readonly IFolderRepository _folderRepository;
        private readonly IUnitOfWork _unitOfWork;
        public PatchFolderUseCase(IFolderRepository folderRepository, IUnitOfWork unitOfWork)
        {
            _folderRepository = folderRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(PatchFolderRequest request, CancellationToken cancellationToken)
        {
            var folder = await _folderRepository.GetFolderByIdAsync(request.Id);
            if (folder == null)
            {
                throw new ValidationException("Folder not found");
            }

            folder.Name = request.Name ?? folder.Name;
            folder.Description = request.Description ?? folder.Description;

           await _folderRepository.UpdateFolderAsync(folder);
           await _unitOfWork.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
