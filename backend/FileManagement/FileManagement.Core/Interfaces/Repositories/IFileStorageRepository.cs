using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IFileStorageRepository
    {
        Task AddFileStorageAsync(FileStorage fileStorage);
    }
}
