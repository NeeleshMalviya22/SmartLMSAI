using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Application.Interfaces.IRepositories;

public interface IModuleProgressRepository : IBaseRepository<ModuleProgress>
{
    Task<List<ModuleProgress>> GetByLearnerAsync(Guid learnerId);
    Task<ModuleProgress?> GetByModuleAndLearnerAsync(Guid moduleId, Guid learnerId);
    Task<List<Enrollment>> GetActiveByLearnerAsync(Guid learnerId);
}
