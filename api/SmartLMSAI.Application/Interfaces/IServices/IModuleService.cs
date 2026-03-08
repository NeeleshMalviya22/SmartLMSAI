using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Courses;
using SmartLMSAI.Application.DTOs.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.Interfaces.IServices
{
    public interface IModuleService
    {
        /// <summary>
        /// Get paginated modules with search & sorting
        /// </summary>
        Task<PagedResult<ModuleDto>> GetModulesAsync(PagedRequest request);

        /// <summary>
        /// Get all modules for a specific course (ordered)
        /// </summary>
        /// <summary>
        /// Create a new module
        /// </summary>
        Task<ApiResponse<Guid>> CreateAsync(CreateModuleDto dto);

        /// <summary>
        /// Update module details
        /// </summary>
        Task<ApiResponse<bool>> UpdateAsync(Guid id, CreateModuleDto dto);

        /// <summary>
        /// Soft delete module
        /// </summary>
        Task<ApiResponse<bool>> DeleteAsync(Guid id);

        Task<ApiResponse<List<CourseDto>>> GetAllAsync();

    }
}
