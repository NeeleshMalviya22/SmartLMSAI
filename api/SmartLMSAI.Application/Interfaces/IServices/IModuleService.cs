using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Modules;

namespace SmartLMSAI.Application.Interfaces.IServices;

public interface IModuleService
{
    Task<PagedResult<ModuleDto>> GetModulesAsync(PagedRequest request);
    Task<ApiResponse<List<ModuleDto>>> GetAllAsync();
    Task<ApiResponse<Guid>> CreateAsync(CreateModuleDto dto);
    Task<ApiResponse<bool>> UpdateAsync(Guid id, CreateModuleDto dto);
    Task<ApiResponse<bool>> DeleteAsync(Guid id);
}
