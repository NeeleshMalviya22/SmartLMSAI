using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Repositories;

public class QuizRepository : BaseRepository<Quiz>, IQuizRepository
{
    public QuizRepository(ApplicationDbContext context) : base(context) { }

    public async Task<PagedResult<Quiz>> GetQuizzesAsync(PagedRequest request)
    {
        var query = _dbSet
            .Where(x => !x.IsDeleted)
            .Include(x => x.Module)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Search))
            query = query.Where(x => x.Title.Contains(request.Search) || x.Module.Title.Contains(request.Search));

        query = request.SortBy?.ToLower() switch
        {
            "title" => request.SortOrder == "desc"
                ? query.OrderByDescending(x => x.Title)
                : query.OrderBy(x => x.Title),
            "passingscore" => request.SortOrder == "desc"
                ? query.OrderByDescending(x => x.PassingScore)
                : query.OrderBy(x => x.PassingScore),
            _ => query.OrderByDescending(x => x.CreatedOn)
        };

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .AsNoTracking()
            .ToListAsync();

        return new PagedResult<Quiz>(items, totalCount);
    }

    public async Task<Quiz?> GetActiveByIdAsync(Guid quizId)
    {
        return await _dbSet
            .AsNoTracking()
            .FirstOrDefaultAsync(q => q.Id == quizId && !q.IsDeleted && q.IsActive);
    }

    public async Task<List<Quiz>> GetActiveByModuleIdsAsync(IEnumerable<Guid> moduleIds)
    {
        return await _dbSet
            .Where(q => !q.IsDeleted && q.IsActive && moduleIds.Contains(q.ModuleId))
            .AsNoTracking()
            .ToListAsync();
    }
}
