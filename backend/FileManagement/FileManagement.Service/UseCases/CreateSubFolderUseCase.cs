using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Contracts.Response;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using MediatR;

namespace FileManagement.Service.UseCases
{
    public class CreateSubFolderUseCase : IRequestHandler<CreateSubFolderRequest, CreateFolderResponse>
    {
        private readonly IFolderRepository _folderRepository;
        private readonly IUnitOfWork _unitOfWork;
        public CreateSubFolderUseCase(IFolderRepository folderRepository, IUnitOfWork unitOfWork)
        {
            _folderRepository = folderRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<CreateFolderResponse> Handle(CreateSubFolderRequest request, CancellationToken cancellationToken)
        {
            var subFolder = new Folder { Name = request.Name,
                ParentFolderId = request.FolderId,
                Description = request.Description
            };

            await _folderRepository.CreateFolderAsync(subFolder);
            await _unitOfWork.SaveChangesAsync();

            return new CreateFolderResponse { Id = subFolder.Id, Name = subFolder.Name };
        }
    }
}
