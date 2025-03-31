using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Response;

namespace FileManagement.Core.Interfaces.Services
{
    public interface IUserFolderService
    {
        Task<List<SubFolderDto>> GetUserSubFolderAsync(int FolderId);

        Task<List<UserFolderResponse>> GerUserFolderAsync();
     
    }
}
