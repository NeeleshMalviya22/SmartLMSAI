using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Courses;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Application.Interfaces.IRepositories;

public interface ICourseRepository : IBaseRepository<Course>
{
    Task<PagedResult<CourseDetailsDto>> GetCoursesAsync(PagedRequest request);
    Task<List<Course>> GetAllActiveWithModulesAsync();
    Task<Course?> GetByIdWithModulesAsync(Guid id);
}
