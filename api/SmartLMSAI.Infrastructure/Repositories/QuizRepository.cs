using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Infrastructure.Repositories
{
    public class QuizRepository : BaseRepository<Quiz>, IQuizRepository
    {
        public QuizRepository(ApplicationDbContext context) : base(context) { }

        public async Task<PagedResult<Quiz>> GetQuizzesAsync(PagedRequest request)
        {
            var query = _dbSet.Include(x => x.Module).Where(x => !x.IsDeleted).AsQueryable();

            // 🔍 search
            if (!string.IsNullOrWhiteSpace(request.Search))
                query = query.Where(x => x.Title.Contains(request.Search) || x.Module.Title.Contains(request.Search));

            // 🔽 sorting
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
    }
    }
