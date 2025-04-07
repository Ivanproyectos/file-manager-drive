using AutoMapper;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using Google.Apis.Drive.v3.Data;
using MediatR;

namespace FileManagement.Service.UseCases;

public class UpdateFolderUseCase : IRequestHandler<UpdateFolderRequest>
{
    private readonly IFolderRepository _folderRepository;
    private readonly IFolderPermissionRepository _folderPermissionRepository;
    private readonly IUserFolderRepository _userFolderRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public UpdateFolderUseCase(
        IFolderRepository folderRepository,
        IUnitOfWork unitOfWork,
        IFolderPermissionRepository folderPermissionRepository,
        IUserFolderRepository userFolderRepository,
        IMapper mapper
    )
    {
        _folderRepository = folderRepository;
        _folderPermissionRepository = folderPermissionRepository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _userFolderRepository = userFolderRepository;
    }

    public async Task<Unit> Handle(UpdateFolderRequest request, CancellationToken cancellationToken)
    {
        var folder = await _folderRepository.GetFolderByIdAsync(request.Id);
        if (folder == null)
        {
            throw new KeyNotFoundException($"La capeta con el id {request.Id} no existe");
        }

        var folderPermissions = _mapper.Map<List<FolderPermission>>(request.FolderPermissions);

        folder.Name = request.Name;
        folder.Description = request.Description;

        await _folderRepository.UpdateFolderAsync(folder);
        await UpdateUserFolderAysnc(folderPermissions, request.Id);

        await _unitOfWork.SaveChangesAsync();

        return Unit.Value;
    }

    private async Task UpdateUserFolderAysnc(List<FolderPermission> folderPermissions, int folderId)
    {
        var existingFolderPersmision =
            await _folderPermissionRepository.GetFolderPermissionsByFolderIdAsync(folderId);

        if (!existingFolderPersmision.Any() && !folderPermissions.Any())
            return;

        var permissionsToRemove = existingFolderPersmision
            .Where(x => !folderPermissions.Any(folder => folder.Id == x.Id))
            .ToList();

        var newPermissions = folderPermissions
            .Where(x => x.Id == 0)
            .Select(x => new FolderPermission
            {
                Id = x.Id,
                FolderId = folderId,
                UserId = x.UserId,
            })
            .ToList();

        var updatedPermissions = folderPermissions.Where(x => x.Id != 0).ToList();

        var userFolderExists = await _userFolderRepository.GetFolderAsync(folderId);

        var userFolderToAdd = newPermissions
            .Select(x => new UserFolder { FolderId = folderId, UserId = x.UserId })
            .ToList();

        var userFolderToRemove = userFolderExists
            .Where(x =>
                permissionsToRemove.Any(userFolder =>
                    userFolder.UserId == x.UserId && userFolder.FolderId == x.FolderId
                )
            )
            .ToList();

        await _userFolderRepository.RemoveUserFolderRangeASync(userFolderToRemove);
        await _userFolderRepository.AddRangeUsersFolder(userFolderToAdd);

        await _folderPermissionRepository.RemoveFolderPermissionRangeAsync(permissionsToRemove);
        await _folderPermissionRepository.AddFolderPermissionRangeAsync(newPermissions);
        await _folderPermissionRepository.UpdateFolderPermissionRangeAsync(updatedPermissions);
    }
}
