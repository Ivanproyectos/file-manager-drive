using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

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
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }

        public async Task<List<Folder>> GetFoldersAsync()
        {
            //var folderDtos = await (from folder in _context.Folders
            //                        join userFolder in _context.UserFolders
            //                            on folder.Id equals userFolder.FolderId
            //                        join file in _context.Files
            //                            on folder.Id equals file.FolderId
            //                        group new { folder, userFolder, file } by new { folder.Id, folder.Name, folder.CreatedAt } into g
            //                        select new FolderDto
            //                        {
            //                            Id = g.Key.Id,  
            //                            Name = g.Key.Name,
            //                            CreatedDate = g.Key.CreatedAt,
            //                            Users = g.Select(u => new UserFolderDto
            //                            {
            //                                Name = u.userFolder.User.People.FirstName,
            //                                Email = u.userFolder.User.People.Email
            //                            }).ToList(),
            //                            Size = g.Select(x => new { x.file.Id, x.file.SizeBytes })
            //                                            .Distinct()
            //                                            .Sum(x => x.SizeBytes)
            //                        }).ToListAsync();

            var folders = await _context.Folders.Where(x => x.ParentFolderId == null)
                            .Include(f => f.UserFolders)
                            .ThenInclude(uf => uf.User)
                            .ThenInclude(u => u.People)
                            .Include(f => f.UserFolders) // Incluir UserFolders
                            .Include(f => f.Files)
                            .OrderByDescending(f => f.Id)// Incluir los archivos asociados
                            .ToListAsync();
                            

            return folders;
        }

        public async Task<List<Folder>> GetSubFoldersAsync(int folderId)
        {
            return await _context.Folders.Where(x => x.ParentFolderId == folderId).ToListAsync();
        }
    }
}
