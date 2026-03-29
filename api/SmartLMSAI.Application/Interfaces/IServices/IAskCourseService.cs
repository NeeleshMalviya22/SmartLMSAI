using SmartLMSAI.Application.DTOs.AskCourse;
using SmartLMSAI.Application.Common;

namespace SmartLMSAI.Application.Interfaces;

public interface IAskCourseService
{
    Task<ApiResponse<AskCourseResponseDto>> AskAsync(AskCourseRequestDto request);
}
