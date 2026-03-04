using SmartLMSAI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.Interfaces.IRepositories
{
    public interface IQuizRepository
    {
        Task<PagedResult<Quiz>> GetQuizzesAsync(PagedRequest request);

        Task<Quiz?> GetByIdAsync(Guid id);

        Task AddAsync(Quiz quiz);

        void Update(Quiz quiz);

        Task SaveChangesAsync();
    }
}
