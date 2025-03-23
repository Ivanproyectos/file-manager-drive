using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace FileManagement.Persistence.Repositories
{
    public class FilePermissionRepository : IFilePermissionRepository
    {
        private readonly ApplicationDbContext _context;
        public FilePermissionRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public async Task AddFilePermissionAsync(FilePermission filePermission)
        {
            await _context.FilePermissions.AddAsync(filePermission);
        }

        public Task AddFilePermissionsAsync(List<FilePermission> filePermissions)
        {
            _context.FilePermissions.AddRange(filePermissions);
            return Task.CompletedTask;
        }

        public  async Task<FilePermission> GetFilePermissionByUserIdAsync(int FileId, int UserId)
        {
            return await _context.FilePermissions.FirstOrDefaultAsync(x => x.FileId == FileId && x.UserId == UserId);
        }
    }
}
