using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace FileManagement.Persistence.Repositories
{
    internal class FolderPermissionRepository : IFolderPermissionRepository
    {
        private readonly ApplicationDbContext _context;

        public FolderPermissionRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public async Task AddFolderPermissionRangeAsync(List<FolderPermission> folderPermissions)
        {
            await _context.FolderPermissions.AddRangeAsync(folderPermissions);
        }

        public async Task<List<FolderPermission>> GetFolderPermissionsByFolderIdAsync(int folderId)
        {
            return await _context
                .FolderPermissions.Include(fp => fp.User)
                .ThenInclude(fp => fp.People)
                .Where(fp => fp.FolderId == folderId && fp.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<List<FolderPermission>> GetFolderPermissionsByUserIdAsync(int userId)
        {
            return await _context.FolderPermissions.Where(fp => fp.UserId == userId).ToListAsync();
        }

        public Task RemoveFolderPermissionRangeAsync(List<FolderPermission> folderPermissions)
        {
            var permissions = folderPermissions
                .Select(x =>
                {
                    x.User = null;
                    return x;
                })
                .ToList();

            foreach (var permission in permissions)
            {
                permission.DeletedAt = DateTime.UtcNow;
                _context.Update(permission);
            }
            return Task.CompletedTask;
        }

        public Task UpdateFolderPermissionRangeAsync(List<FolderPermission> folderPermissions)
        {
            foreach (var permission in folderPermissions)
            {
                _context.Update(permission);
            }
            return Task.CompletedTask;
        }
    }
}
