using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;

namespace FileManagement.Persistence.Repositories
{
    public class FileStorageRepository : IFileStorageRepository
    {
        private readonly ApplicationDbContext _context;
        public FileStorageRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public Task AddFileStorageAsync(FileStorage fileStorage)
        {
            _context.AddAsync(fileStorage);
            return Task.CompletedTask;
        }
    }
}
