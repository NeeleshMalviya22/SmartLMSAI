using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Enrollments;

namespace SmartLMSAI.Application.Interfaces.IServices;

public interface IEnrollmentService
{
    Task<PagedResult<EnrollmentDto>> GetEnrollmentsAsync(PagedRequest request);
    Task<ApiResponse<Guid>> EnrollAsync(EnrollCourseDto dto, Guid userId);
    Task<ApiResponse<bool>> DeleteAsync(Guid id);
}
