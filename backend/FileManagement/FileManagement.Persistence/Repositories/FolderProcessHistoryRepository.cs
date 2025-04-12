using FileManagement.Core.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileManagement.Core.Entities;
using FileManagement.Persistence.Contexts;

namespace FileManagement.Persistence.Repositories
{
    public class FolderProcessHistoryRepository : IFolderProcessHistoryRepository
    {
        private readonly ApplicationDbContext _context;
        public FolderProcessHistoryRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task CreateAsync(FolderProcessHistory folderProcessHistory)
        {
            await _context.FolderProcessHistories.AddAsync(folderProcessHistory);
        }

        public Task UpdateStatusActiveAsync(List<FolderProcessHistory> folderProcessHistories)
        {
            _context.FolderProcessHistories.UpdateRange(folderProcessHistories);
            return Task.CompletedTask;
        }
    
    }
}
