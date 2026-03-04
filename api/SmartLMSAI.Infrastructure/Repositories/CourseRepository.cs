using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Interfaces;
using SmartLMSAI.Domain.Entities;
using SmartLMSAI.Infrastructure;

public class CourseRepository : BaseRepository<Course>, ICourseRepository
{

    public CourseRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<PagedResult<Course>> GetCoursesAsync(PagedRequest request)
    {
        var query = _context.Courses.Where(x => x.IsDeleted != true).AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.Trim();
            query = query.Where(c => c.Title.Contains(term));
        }

        if (!string.IsNullOrEmpty(request.SortBy))
        {
            switch (request.SortBy.ToLower())
            {
                case "title":
                    query = request.SortOrder == "desc"
                        ? query.OrderByDescending(c => c.Title)
                        : query.OrderBy(c => c.Title);
                    break;

                case "isactive":
                    query = request.SortOrder == "desc"
                        ? query.OrderByDescending(c => c.IsActive)
                        : query.OrderBy(c => c.IsActive);
                    break;

                default:
                    query = query.OrderByDescending(c => c.Id);
                    break;
            }
        }
        else
        {
            query = query.OrderByDescending(c => c.Id);
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync();

        return new PagedResult<Course>(items, totalCount);
    }
}