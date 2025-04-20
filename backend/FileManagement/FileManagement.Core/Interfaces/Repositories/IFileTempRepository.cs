
using FileManagement.Core.Entities;
using CoreLayer = FileManagement.Core.Entities;
namespace FileManagement.Core.Interfaces.Repositories { 
    public interface IFileTempRepository
    {
        Task<List<FileTemp>> GetAllByUploadIdAsync(string uploadId);
        Task AddFileRangeAsync(List<FileTemp> fileTemps);
        Task UpdateFileAsync(FileTemp fileTemp);
        Task RemoveFileRangeAsync(List<FileTemp> fileTemps);
    }
}
