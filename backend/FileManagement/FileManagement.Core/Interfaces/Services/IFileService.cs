using FileManagement.Core.Contracts.Dtos;

namespace FileManagement.Core.Interfaces.Services
{
    public interface IFileService
    {
        Task<List<FileDto>> GetFilesByFolderIdAsync(int FolderId);
    }
}
