using SmartLMSAI.Application.DTOs.Courses;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Application.Interfaces;

public interface ICourseService
{
    Task<ApiResponse<List<CourseDto>>> GetAllAsync();
    Task<ApiResponse<Guid>> CreateAsync(CreateCourseDto dto, string userId);
    Task<ApiResponse<bool>> DeleteAsync(Guid id);
    Task<ApiResponse<bool>> UpdateAsync(Guid id, CreateCourseDto dto, string userId);
    Task<PagedResult<Course>> GetCoursesAsync(PagedRequest request);

}
