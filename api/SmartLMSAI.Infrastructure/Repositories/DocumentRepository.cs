using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Repositories;

public class DocumentRepository : BaseRepository<Document>, IDocumentRepository
{
    public DocumentRepository(ApplicationDbContext context) : base(context) { }

    public async Task<PagedResult<Document>> GetPagedAsync(PagedRequest request)
    {
        var query = _dbSet
            .Where(x => !x.IsDeleted)
            .Include(x => x.Module)
            .AsNoTracking();

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.Trim();
            query = query.Where(x =>
                x.FileName.Contains(term) ||
                x.Module.Title.Contains(term));
        }

        query = request.SortBy?.ToLower() switch
        {
            "filename" => request.SortOrder == "desc"
                ? query.OrderByDescending(x => x.FileName)
                : query.OrderBy(x => x.FileName),
            "modulename" => request.SortOrder == "desc"
                ? query.OrderByDescending(x => x.Module.Title)
                : query.OrderBy(x => x.Module.Title),
            _ => query.OrderByDescending(x => x.CreatedOn)
        };

        var total = await query.CountAsync();

        var items = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync();

        return new PagedResult<Document>(items, total);
    }

    public async Task<List<Document>> GetByModuleAsync(Guid moduleId)
    {
        return await _dbSet
            .Include(m => m.Module)
            .Where(x => !x.IsDeleted && x.ModuleId == moduleId)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<List<Document>> GetByCourseWithTextAsync(Guid moduleId)
    {
        return await _dbSet
            .Include(d => d.Module)
            .Where(d => !d.IsDeleted
                && d.Module.Id == moduleId
                && d.ExtractedText != null)
            .AsNoTracking()
            .ToListAsync();
    }
}
