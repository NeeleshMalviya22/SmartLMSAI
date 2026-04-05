using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Courses;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Repositories;

public class CourseRepository : BaseRepository<Course>, ICourseRepository
{
    public CourseRepository(ApplicationDbContext context) : base(context) { }

    public async Task<PagedResult<CourseDetailsDto>> GetCoursesAsync(PagedRequest request)
    {
        var query = _dbSet
            .Where(x => !x.IsDeleted)
            .Include(x => x.Modules)
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.Trim();
            query = query.Where(c => c.Title.Contains(term));
        }

        query = request.SortBy?.ToLower() switch
        {
            "title" => request.SortOrder == "desc"
                ? query.OrderByDescending(c => c.Title)
                : query.OrderBy(c => c.Title),
            "isactive" => request.SortOrder == "desc"
                ? query.OrderByDescending(c => c.IsActive)
                : query.OrderBy(c => c.IsActive),
            _ => query.OrderByDescending(c => c.CreatedOn)
        };

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(c => new CourseDetailsDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                IsActive = c.IsActive,
                CreatedOn = c.CreatedOn.ToString("dd MMM yyyy"),
                ModuleCount = c.Modules.Count(m => !m.IsDeleted),
                LearnerCount = 0,
                ModuleNames = string.Join(", ", c.Modules
                    .Where(m => !m.IsDeleted)
                    .Select(m => m.Title))
            })
            .ToListAsync();

        return new PagedResult<CourseDetailsDto>(items, totalCount);
    }

    public async Task<List<Course>> GetAllActiveWithModulesAsync()
    {
        return await _dbSet
            .Where(c => !c.IsDeleted && c.IsActive)
            .Include(c => c.Modules)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Course?> GetByIdWithModulesAsync(Guid id)
    {
        return await _dbSet
            .Include(c => c.Modules)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
    }
}
