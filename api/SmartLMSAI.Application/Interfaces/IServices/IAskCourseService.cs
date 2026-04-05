using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.AskCourse;

namespace SmartLMSAI.Application.Interfaces.IServices;

public interface IAskCourseService
{
    Task<ApiResponse<AskCourseResponseDto>> AskAsync(AskCourseRequestDto request);
}
