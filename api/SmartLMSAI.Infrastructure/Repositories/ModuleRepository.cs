using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Infrastructure.Repositories;
using SmartLMSAI.Infrastructure;
using SmartLMSAI.Domain.Entities;
namespace SmartLMSAI.Infrastructure.Repositories
{
    public class ModuleRepository : BaseRepository<Module>, IModuleRepository
    {
        public ModuleRepository(ApplicationDbContext db) : base(db) { }

        public async Task<PagedResult<Module>> GetPagedAsync(PagedRequest request)
        {
            var query = _context.Modules
                .Where(x => !x.IsDeleted)
                .Include(x => x.Course)
                .AsNoTracking();

            // 🔎 Search
            if (!string.IsNullOrWhiteSpace(request.Search))
            {
                var term = request.Search.Trim();
                query = query.Where(x => x.Title.Contains(term));
            }

            // 🔀 Sorting
            if (!string.IsNullOrEmpty(request.SortBy))
            {
                switch (request.SortBy.ToLower())
                {
                    case "title":
                        query = request.SortOrder == "desc"
                            ? query.OrderByDescending(x => x.Title)
                            : query.OrderBy(x => x.Title);
                        break;

                    case "orderindex":
                        query = request.SortOrder == "desc"
                            ? query.OrderByDescending(x => x.OrderIndex)
                            : query.OrderBy(x => x.OrderIndex);
                        break;

                    default:
                        query = query.OrderByDescending(x => x.CreatedBy);
                        break;
                }
            }
            else
            {
                query = query.OrderByDescending(x => x.CreatedOn);
            }

            var total = await query.CountAsync();

            var items = await query
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return new PagedResult<Module>(items, total);
        }
        public async Task<List<Module>> GetModulesByCourseIdAsync(Guid courseId)
        {
            return await _context.Modules
                .Where(m => m.CourseId == courseId)
                .ToListAsync();
        }

    }
}