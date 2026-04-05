using SmartLMSAI.Application.Common;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Application.Interfaces.IRepositories;

public interface IQuizRepository : IBaseRepository<Quiz>
{
    Task<PagedResult<Quiz>> GetQuizzesAsync(PagedRequest request);
    Task<Quiz?> GetActiveByIdAsync(Guid quizId);
    Task<List<Quiz>> GetActiveByModuleIdsAsync(IEnumerable<Guid> moduleIds);
}
