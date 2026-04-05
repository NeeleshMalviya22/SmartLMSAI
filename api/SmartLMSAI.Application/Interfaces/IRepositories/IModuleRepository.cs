using SmartLMSAI.Application.Common;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Application.Interfaces.IRepositories;

public interface IModuleRepository : IBaseRepository<Module>
{
    Task<PagedResult<Module>> GetPagedAsync(PagedRequest request);
}
