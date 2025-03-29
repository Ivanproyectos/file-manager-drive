using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Service.Services
{
    public class FolderService : IFolderService
    {
        public Task<List<FolderDto>> getAllFolders()
        {
            throw new NotImplementedException();
        }
    }
}
