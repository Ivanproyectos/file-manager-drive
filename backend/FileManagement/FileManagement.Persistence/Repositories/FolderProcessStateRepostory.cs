using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace FileManagement.Persistence.Repositories
{
    public class FolderProcessStateRepostory : IFolderProcessStateRepostory
    {
        private readonly ApplicationDbContext _context;
        public FolderProcessStateRepostory(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public async Task<List<FolderProcessState>> GetFolderProcessStateAsync()
        {
            return await _context.FolderProcessStates.ToListAsync();
        }
    }
}
