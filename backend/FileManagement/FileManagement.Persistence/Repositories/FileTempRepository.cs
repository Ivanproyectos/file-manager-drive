using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace FileManagement.Persistence.Repositories
{

    public class FileTempRepository : IFileTempRepository
    {
        private readonly ApplicationDbContext _context;
        public FileTempRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task AddFileRangeAsync(List<FileTemp> fileTemps)
        {
            await _context.FileTemps.AddRangeAsync(fileTemps);
        }

        public Task<List<FileTemp>> GetAllByUploadIdAsync(string uploadId)
        {
          return _context.FileTemps.Where(x => x.UploadId == uploadId).ToListAsync();
        }

        public Task RemoveFileRangeAsync(List<FileTemp> fileTemps)
        {
            _context.FileTemps.RemoveRange(fileTemps);
            return Task.CompletedTask;
        }

        public Task UpdateFileAsync(FileTemp fileTemp)
        {
            _context.FileTemps.Update(fileTemp);
            return Task.CompletedTask;
        }
    }
}
