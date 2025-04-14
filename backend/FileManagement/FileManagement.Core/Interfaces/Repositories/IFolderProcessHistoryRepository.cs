using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IFolderProcessHistoryRepository
    {
        Task<List<FolderProcessHistory>> GetHistoriesAsync(int folderId);
        Task CreateAsync(FolderProcessHistory folderProcessHistory);

        Task UpdateStatusActiveAsync(List<FolderProcessHistory> folderProcessHistories);
    }
}
