using SmartLMSAI.Application.Common;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Application.Interfaces.IRepositories;

public interface IEnrollmentRepository : IBaseRepository<Enrollment>
{
    Task<PagedResult<Enrollment>> GetEnrollmentsAsync(PagedRequest request);
    Task<bool> ExistsAsync(Guid courseId, Guid learnerId);
}
