using AutoMapper;
using FileManagement.Core.Contracts.Response;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;

namespace FileManagement.Service.Services;

public class FolderPermissionService : IFolderPermissionService
{
    private readonly IFolderPermissionRepository _folderPermissionRepository;
    private readonly IMapper _mapper;
    public FolderPermissionService(
        IFolderPermissionRepository folderPermissionRepository,
        IMapper mapper)
    {
        _folderPermissionRepository = folderPermissionRepository;
        _mapper = mapper;
    }
    public async Task<List<FolderPermissionResponse>> GetFolderPermissionsByFolderIdAsync(int folderId)
    {
       var folderPermissions = await _folderPermissionRepository.GetFolderPermissionsByFolderIdAsync(folderId);
        if (folderPermissions == null)
        {
            throw new KeyNotFoundException("No folder permissions found for the given folder ID.");
        }
        return _mapper.Map<List<FolderPermissionResponse>>(folderPermissions);
    }
}