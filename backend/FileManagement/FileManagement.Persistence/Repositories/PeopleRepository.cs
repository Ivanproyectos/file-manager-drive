using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace FileManagement.Persistence.Repositories
{
    public class PeopleRepository : IPeopleRepository
    {
        private readonly ApplicationDbContext _context;
        public PeopleRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task AddPeopleAsync(People people)
        {
            await _context.Peoples.AddAsync(people);
        }

        public Task DeletePeopleAsync(int id)
        {
            var people = _context.Peoples.Find(id);
            people.DeletedAt = DateTime.Now;

            _context.Peoples.Update(people);
            return Task.CompletedTask;
        }

        public Task<List<People>> GetAllPeopleAsync()
        {
            return _context.Peoples.ToListAsync();
        }

        public async Task<People> GetPeopleByIdentificationAsync(string identification)
        { 
            return await _context.Peoples.Include(p => p.User)
                .FirstOrDefaultAsync(x => x.Identification == identification);
        }

        public Task<People> GetPeopleByIdAsync(int id)
        {
            return _context.Peoples.FirstOrDefaultAsync(p => p.Id == id);
        }

        public Task UpdatePeopleAsync(People people)
        {
            var peopleUpdate = _context.Peoples.Find(people.Id);

            people.CreatedAt = peopleUpdate.CreatedAt;
            people.CreatedBy = peopleUpdate.CreatedBy;
            _context.Peoples.Update(people);
            return Task.CompletedTask;
        }
    }
}
