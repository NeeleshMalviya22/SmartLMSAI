using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.DTOs.Document;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Infrastructure.Repositories
{
    public class DocumentRepository : BaseRepository<Document>, IDocumentRepository
    {
        public DocumentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<PagedResult<Document>> GetPagedAsync(PagedRequest request)
        {
            var query = _context.Documents
                .Where(x => !x.IsDeleted)
                .Include(x => x.Module)
                .AsNoTracking();

            // 🔎 Search
            if (!string.IsNullOrWhiteSpace(request.Search))
            {
                var term = request.Search.Trim();

                query = query.Where(x =>
                    x.FileName.Contains(term) ||
                    x.Module.Title.Contains(term));
            }

            // 🔀 Sorting
            if (!string.IsNullOrEmpty(request.SortBy))
            {
                switch (request.SortBy.ToLower())
                {
                    case "filename":
                        query = request.SortOrder == "desc"
                            ? query.OrderByDescending(x => x.FileName)
                            : query.OrderBy(x => x.FileName);
                        break;

                    case "modulename":
                        query = request.SortOrder == "desc"
                            ? query.OrderByDescending(x => x.Module.Title)
                            : query.OrderBy(x => x.Module.Title);
                        break;

                    default:
                        query = query.OrderByDescending(x => x.CreatedOn);
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

            return new PagedResult<Document>(items, total);
        }
        public async Task<List<Document>> GetByModuleAsync(Guid moduleId)
        {
            return await _context.Documents.Include(m => m.Module)
                .Where(x => !x.IsDeleted)
                .AsNoTracking()
                .ToListAsync();
        }

       
    }
}
