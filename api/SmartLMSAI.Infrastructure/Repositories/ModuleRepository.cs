using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Repositories;

public class ModuleRepository : BaseRepository<Module>, IModuleRepository
{
    public ModuleRepository(ApplicationDbContext db) : base(db) { }

    public async Task<PagedResult<Module>> GetPagedAsync(PagedRequest request)
    {
        var query = _dbSet
            .Where(x => !x.IsDeleted)
            .Include(x => x.Course)
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.Trim();
            query = query.Where(x => x.Title.Contains(term));
        }

        query = request.SortBy?.ToLower() switch
        {
            "title" => request.SortOrder == "desc"
                ? query.OrderByDescending(x => x.Title)
                : query.OrderBy(x => x.Title),
            "orderindex" => request.SortOrder == "desc"
                ? query.OrderByDescending(x => x.OrderIndex)
                : query.OrderBy(x => x.OrderIndex),
            _ => query.OrderByDescending(x => x.CreatedOn)
        };

        var total = await query.CountAsync();

        var items = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync();

        return new PagedResult<Module>(items, total);
    }
}
