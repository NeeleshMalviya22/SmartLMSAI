using SmartLMSAI.Application.Common;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Application.Interfaces.IRepositories;

public interface IDocumentRepository : IBaseRepository<Document>
{
    Task<PagedResult<Document>> GetPagedAsync(PagedRequest request);
    Task<List<Document>> GetByModuleAsync(Guid moduleId);
    Task<List<Document>> GetByCourseWithTextAsync(Guid courseId);
}
