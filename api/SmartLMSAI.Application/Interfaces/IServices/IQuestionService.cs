using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Questions;

namespace SmartLMSAI.Application.Interfaces.IServices;

public interface IQuestionService
{
    Task<PagedResult<QuestionDto>> GetQuestionsAsync(PagedRequest request, Guid quizId);
    Task<ApiResponse<Guid>> CreateAsync(CreateQuestionDto dto, Guid userId);
    Task<ApiResponse<bool>> DeleteAsync(Guid id);
}
