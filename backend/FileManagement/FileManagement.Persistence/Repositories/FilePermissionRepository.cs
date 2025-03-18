using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Persistence.Repositories
{
    public class FilePermissionRepository : IFilePermissionRepository
    {
        private readonly ApplicationDbContext _context;
        public FilePermissionRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public  async Task<FilePermission> GetFilePermissionByUserIdAsync(int FileId, int UserId)
        {
            return await _context.FilePermissions.FirstOrDefaultAsync(x => x.FileId == FileId && x.UserId == UserId);
        }
    }
}
