using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace FileManagement.Persistence.Repositories
{
    public class FolderRepository : IFolderRepository
    {
        private readonly ApplicationDbContext _context;
        public FolderRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task<Folder> CreateFolderAsync(Folder folder)
        {
            var result = await _context.Folders.AddAsync(folder);
            return result.Entity;
        }

        public Task DeleteFolderAsync(Folder folder)
        {
            folder.DeletedAt = DateTime.UtcNow;
            _context.Folders.Update(folder);
            return Task.CompletedTask;
        }

        public async Task<Folder> GetFolderByIdAsync(int id)
        {
            return await _context.Folders.FirstOrDefaultAsync(f => f.Id == id);
        }

        public Task<Folder> GetFolderByNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResultDto<List<Folder>>> GetPagedFoldersAsync(string searchTerm, int pageNumber, int pageSize)
        {
            var query = _context.Folders.AsQueryable(); // Permite filtros dinámicos en el futuro

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(f => f.Name.Contains(searchTerm));
            }

            int totalRecords = await query.CountAsync();

            var folders = await query
              .OrderBy(f => f.Id) // Asegurar orden estable
              .Skip((pageNumber - 1) * pageSize)
              .Take(pageSize)
              .ToListAsync();

            return new PagedResultDto<List<Folder>>(folders, totalRecords, pageNumber, pageSize);
        }

        public Task<IEnumerable<Folder>> GetFoldersByUserIdAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<Folder> UpdateFolderAsync(Folder folder)
        {
            _context.Folders.Update(folder);
            return Task.FromResult(folder);
        }

        public async Task<List<Folder>> GetFoldersAsync(string? folderName)
        {
            var query  = _context.Folders.Where(x => x.ParentFolderId == null)
                            .Include(f => f.SubFolders)
                            .ThenInclude(sf => sf.Files)
                            .Include(f => f.UserFolders)
                            .ThenInclude(uf => uf.User)
                            .ThenInclude(u => u.People)
                            .Include(f => f.UserFolders)
                            .Include(f => f.Files)
                            .Include(f => f.FolderProcessHistories)
                            .ThenInclude(fh => fh.FolderProcessStates)
                            .OrderByDescending(f => f.Id)
                              .AsQueryable();

            if (!string.IsNullOrEmpty(folderName))
            {
                query = query.Where(f => f.Name.Contains(folderName));
            }


            //var folders = await _context.Folders.Where(x => x.ParentFolderId == null)
            //                .Include(f => f.UserFolders)
            //                .ThenInclude(uf => uf.User)
            //                .ThenInclude(u => u.People)
            //                .Include(f => f.UserFolders)
            //                .Include(f => f.Files)
            //                .Include(f => f.FolderProcessHistories)
            //                .ThenInclude(fh => fh.FolderProcessStates)
            //                .OrderByDescending(f => f.Id)
            //                .ToListAsync();
                            

            return await query.ToListAsync();
            
        }

        public async Task<List<Folder>> GetSubFoldersAsync(int folderId)
        {
            return await _context.Folders.Where(x => x.ParentFolderId == folderId).ToListAsync();
        }

        public Task DeleteFolderRangeAsync(List<Folder> folders)
        {
            foreach (var folder in folders)
            {
                folder.DeletedAt = DateTime.UtcNow;
                _context.Folders.Update(folder);
            }

            return Task.CompletedTask;

        }

        public Task UpdateStatusAsync(Folder folder)
        {
            folder.Status = !folder.Status;
            _context.Folders.Update(folder);

            return Task.CompletedTask;
        }
    }
}
