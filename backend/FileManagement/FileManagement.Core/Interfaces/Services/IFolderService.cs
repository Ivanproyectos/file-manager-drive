using FileManagement.Core.Contracts.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Interfaces.Services
{
    public interface IFolderService
    {
        public Task<List<FolderDto>> getAllFolders();
    }
}
