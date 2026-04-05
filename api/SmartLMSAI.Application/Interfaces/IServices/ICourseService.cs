using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Courses;

namespace SmartLMSAI.Application.Interfaces.IServices;

public interface ICourseService
{
    Task<ApiResponse<List<CourseDto>>> GetAllAsync();
    Task<PagedResult<CourseDetailsDto>> GetCoursesAsync(PagedRequest request);
    Task<ApiResponse<Guid>> CreateAsync(CreateCourseDto dto, Guid userId);
    Task<ApiResponse<bool>> UpdateAsync(Guid id, CreateCourseDto dto, Guid? userId);
    Task<ApiResponse<bool>> DeleteAsync(Guid id);
}
