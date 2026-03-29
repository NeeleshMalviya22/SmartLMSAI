using SmartLMSAI.Application.DTOs.Document;
using SmartLMSAI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.Interfaces.IRepositories
{
    public interface IDocumentRepository
    {
        Task<List<Document>> GetByModuleAsync(Guid moduleId);

        Task<List<Document>> GetByCourseWithTextAsync(Guid courseId);

        Task AddAsync(Document document);

        Task<Document?> GetByIdAsync(Guid id);

        Task SaveChangesAsync();
        Task<PagedResult<Document>> GetPagedAsync(PagedRequest request);
    }
}
