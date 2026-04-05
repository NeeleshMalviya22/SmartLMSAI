using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Repositories;

public class ModuleProgressRepository : BaseRepository<ModuleProgress>, IModuleProgressRepository
{
    public ModuleProgressRepository(ApplicationDbContext context) : base(context) { }

    public async Task<List<Enrollment>> GetActiveByLearnerAsync(Guid learnerId)
    {
        return await _context.Enrollments
            .Where(e => e.LearnerId == learnerId && e.Status == "ACTIVE")
            .ToListAsync();
    }

    public async Task<List<ModuleProgress>> GetByLearnerAsync(Guid learnerId)
    {
        return await _dbSet
            .Where(p => p.LearnerId == learnerId && !p.IsDeleted)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<ModuleProgress?> GetByModuleAndLearnerAsync(Guid moduleId, Guid learnerId)
    {
        return await _dbSet
            .FirstOrDefaultAsync(p => p.ModuleId == moduleId && p.LearnerId == learnerId && !p.IsDeleted);
    }
}
