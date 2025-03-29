using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IFolderRepository
    {
        Task<List<Folder>> GetSubFoldersAsync(int folderId);
        Task<List<Folder>> GetFoldersAsync();
        Task<PagedResultDto<List<Folder>>> GetPagedFoldersAsync(string searchTerm, int pageNumber, int pageSize);
        Task<IEnumerable<Folder>> GetFoldersByUserIdAsync(int userId);
        Task<Folder> GetFolderByIdAsync(int id);
        Task<Folder> GetFolderByNameAsync(string name);
        Task<Folder> CreateFolderAsync(Folder folder);
        Task<Folder> UpdateFolderAsync(Folder folder);
        Task DeleteFolderAsync(Folder folder);
    }
}
