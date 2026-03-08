using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Questions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.Interfaces.IServices
{
    public interface IQuestionService
    {
        Task<PagedResult<QuestionDto>> GetQuestionsAsync(PagedRequest request, Guid quizId);

        Task<ApiResponse<Guid>> CreateAsync(CreateQuestionDto dto, Guid userId);

        Task<ApiResponse<bool>> DeleteAsync(Guid id);
    }
}
