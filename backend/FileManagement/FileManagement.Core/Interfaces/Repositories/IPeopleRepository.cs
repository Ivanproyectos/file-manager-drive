using FileManagement.Core.Entities;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IPeopleRepository
    {
        Task<People> GetPeopleByIdAsync(int id);
        Task<List<People>> GetAllPeopleAsync();
        Task AddPeopleAsync(People people);
        Task UpdatePeopleAsync(People people);
        Task DeletePeopleAsync(int id);
    }
}
