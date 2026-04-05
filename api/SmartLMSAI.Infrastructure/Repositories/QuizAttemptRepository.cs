using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Repositories;

public class QuizAttemptRepository : BaseRepository<QuizAttempt>, IQuizAttemptRepository
{
    public QuizAttemptRepository(ApplicationDbContext context) : base(context) { }
}
