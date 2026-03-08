using SmartLMSAI.Application.DTOs.Questions;
using SmartLMSAI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.Interfaces.IRepositories
{
    public interface IQuestionRepository
    {
        Task<PagedResult<QuestionDto>> GetQuestionsAsync(PagedRequest request, Guid quizId);

        Task<Question?> GetByIdAsync(Guid id);

        Task AddAsync(Question entity);

        void Update(Question entity);

        Task SaveChangesAsync();
    }
}
