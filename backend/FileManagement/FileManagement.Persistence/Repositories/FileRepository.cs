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

        public Task AddFileAsync(Core.Entities.File File)
        {
            _context.AddAsync(File);
            return Task.CompletedTask;
        }

        public Task DeleteFileAsync(Core.Entities.File File)
        {
            File.DeletedAt = DateTime.Now;
            _context.Files.Update(File);
            return Task.CompletedTask;
        }

        public Task<Core.Entities.File> GetFileByIdAsync(int FileId)
        {
           return _context.Files.Include(x => x.FileStorage)
                .FirstOrDefaultAsync(x => x.Id == FileId);
        }

        public async Task<List<Core.Entities.File>> GetFilesByFolderIdAsync(int FolderId)
        {
            return await _context.Files.Include(x => x.FileStorage)
                .Where(x => x.FolderId == FolderId).ToListAsync();
        }

        public Task<List<Core.Entities.File>> GetFilesWithPermissionsAsync(int FolderId, int UserId)
        {
            return _context.Files.Where(x => x.FolderId == FolderId).Select(f => new Core.Entities.File {
                Id = f.Id,
                FileName = f.FileName,
                FolderId = f.FolderId,
                SizeBytes = f.SizeBytes,
                CreatedAt = f.CreatedAt,
                Extension = f.Extension,
                Permission = _context.FilePermissions.FirstOrDefault(fp => fp.FileId == f.Id && fp.UserId == UserId)
            }).ToListAsync();
        }

        public Task UpdateFileAsync(Core.Entities.File File)
        {
            throw new NotImplementedException();
        }
    }
}
