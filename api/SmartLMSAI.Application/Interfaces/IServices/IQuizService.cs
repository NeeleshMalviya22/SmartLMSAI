using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Quizzes;

namespace SmartLMSAI.Application.Interfaces.IServices;

public interface IQuizService
{
    Task<PagedResult<QuizDto>> GetQuizzesAsync(PagedRequest request);
    Task<ApiResponse<Guid>> CreateAsync(CreateQuizDto dto, Guid userId);
    Task<ApiResponse<bool>> UpdateAsync(Guid id, CreateQuizDto dto, Guid userId);
    Task<ApiResponse<bool>> DeleteAsync(Guid id);
}
