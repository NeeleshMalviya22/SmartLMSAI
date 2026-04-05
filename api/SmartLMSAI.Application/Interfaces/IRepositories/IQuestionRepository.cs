using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Questions;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Application.Interfaces.IRepositories;

public interface IQuestionRepository : IBaseRepository<Question>
{
    Task<PagedResult<QuestionDto>> GetQuestionsAsync(PagedRequest request, Guid quizId);
    Task<List<Question>> GetByQuizIdWithOptionsAsync(Guid quizId);
}
