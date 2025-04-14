using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Response;

namespace FileManagement.Core.Interfaces.Services
{
    public interface IFileService
    {
        Task<List<UserFileDto>> GetFilesByFolderIdAsync(int folderId);
        Task<DownloadResponse> DownloadFileAsync(int fileId);

        Task DeleteFileAsync(int fileId);
    }
}
