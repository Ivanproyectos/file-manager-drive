using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace FileManagement.Persistence.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly ApplicationDbContext _context;
        public FileRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public async Task<List<Core.Entities.File>> GetFilesByFolderIdAsync(int FolderId)
        {
            return await _context.Files.Where(x => x.FolderId == FolderId).ToListAsync();
        }
    }
}
