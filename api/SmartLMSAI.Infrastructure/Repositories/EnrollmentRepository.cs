using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Repositories;

public class EnrollmentRepository : BaseRepository<Enrollment>, IEnrollmentRepository
{
    public EnrollmentRepository(ApplicationDbContext context) : base(context) { }

    public async Task<PagedResult<Enrollment>> GetEnrollmentsAsync(PagedRequest request)
    {
        var query = _dbSet
            .Include(x => x.Course)
            .Where(x => !x.IsDeleted)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Search))
            query = query.Where(x => x.Course.Title.Contains(request.Search));

        query = request.SortBy?.ToLower() switch
        {
            "course" => request.SortOrder == "desc"
                ? query.OrderByDescending(x => x.Course.Title)
                : query.OrderBy(x => x.Course.Title),
            _ => query.OrderByDescending(x => x.CreatedOn)
        };

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .AsNoTracking()
            .ToListAsync();

        return new PagedResult<Enrollment>(items, totalCount);
    }

    public async Task<bool> ExistsAsync(Guid courseId, Guid learnerId)
    {
        return await _dbSet
            .AnyAsync(e => e.CourseId == courseId && e.LearnerId == learnerId && !e.IsDeleted);
    }
}
