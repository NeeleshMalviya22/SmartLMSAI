using SmartLMSAI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Infrastructure.Repositories
{
    public interface IModuleRepository
    {
        Task<PagedResult<Module>> GetPagedAsync(PagedRequest request);
        Task<Module?> GetByIdAsync(Guid id);
        Task AddAsync(Module module);
        void Update(Module module);
        Task SaveChangesAsync();
        Task<List<Module>> GetAllAsync();

    }
}
