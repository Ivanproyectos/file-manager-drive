using AutoMapper;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Contracts.Response;
using FileManagement.Core.Entities;
using FileManagement.Core.Exceptions;
using FileManagement.Core.Interfaces.Repositories;
using MediatR;

namespace FileManagement.Service.UseCases
{
    public class CreateFolderUseCase : IRequestHandler<CreateFolderRequest, CreateFolderResponse>
    {
        private readonly IFolderRepository _folderRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserFolderRepository _userFolderRepository;
        private readonly IUserRepository _userRepository;
        public CreateFolderUseCase(IFolderRepository folderRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IUserFolderRepository userFolderRepository,
            IUserRepository userRepository)
        {
            _folderRepository = folderRepository;
            _userFolderRepository = userFolderRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userRepository = userRepository;
        }
        public async Task<CreateFolderResponse> Handle(CreateFolderRequest request, CancellationToken cancellationToken)
        {
            var folder = new Folder
            {
                Name = request.Name,
                Description = request.Description,
                ParentFolderId = request.ParentId == 0 ? null : request.ParentId
            };

            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var newFolder = await _folderRepository.CreateFolderAsync(folder);
                await _unitOfWork.SaveChangesAsync();

                if (request.AsignedFolder)
                {
                    if (!request.UsersId.Any())
                    {
                        throw new ValidationException("No se asignaron usuarios a la carpeta");
                    }

                    foreach (var item in request.UsersId)
                    {
                        User user = await _userRepository.GetUserByIdAsync(item);
                        if (user is null)
                        {
                            throw new ValidationException("Uno o mas de los usuarios no existen");
                        }
                    }

                    var userFolders = request.UsersId
                          .Select(idUser => new UserFolder { FolderId = newFolder.Id, UserId = idUser })
                          .ToList();
                    await _userFolderRepository.AddRangeUsersFolder(userFolders);
                }
                await _unitOfWork.CommitAsync();

                return _mapper.Map<CreateFolderResponse>(newFolder);
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }


        }
    }
}
