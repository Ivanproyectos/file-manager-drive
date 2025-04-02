using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
