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
    public class FileUploadConfigurationRepository : IFileUploadConfigurationRepository
    {
        private readonly ApplicationDbContext _context;
        public FileUploadConfigurationRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public async Task<FileUploadConfiguration> GetAsync()
        {
           return await _context.FileUploadConfigurations.FirstAsync();
        }
    }
}
