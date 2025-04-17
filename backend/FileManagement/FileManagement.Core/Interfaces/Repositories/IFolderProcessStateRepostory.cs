using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IFolderProcessStateRepostory
    {
        public Task<List<FolderProcessState>> GetFolderProcessStateAsync();

    }
}
