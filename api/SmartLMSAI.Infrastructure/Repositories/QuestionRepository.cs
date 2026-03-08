using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.DTOs.Questions;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Domain.Entities;
using SmartLMSAI.Infrastructure.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Infrastructure.Repositories
{
    public class QuestionRepository : BaseRepository<Question>, IQuestionRepository
    {
        public QuestionRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<PagedResult<QuestionDto>> GetQuestionsAsync(PagedRequest request, Guid quizId)
        {
            var query = _context.Set<Question>()
                .Include(x => x.QuestionType)
                .Include(x => x.Options)
                .Where(x => x.QuizId == quizId && !x.IsDeleted)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.Search))
            {
                query = query.Where(x => x.QuestionText.Contains(request.Search));
            }

            var total = await query.CountAsync();

            var items = await query
                .OrderBy(x => x.OrderIndex)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(q => new QuestionDto
                {
                    QuestionId = q.Id,
                    QuizId = q.QuizId,
                    QuestionText = q.QuestionText,
                    OrderIndex = q.OrderIndex,
                    QuestionTypeId = q.QuestionTypeId,
                    QuestionType = q.QuestionType.TypeName,
                    Options = q.Options.Select(o => new QuestionOptionDto
                    {
                        OptionId = o.Id,
                        OptionText = o.OptionText,
                        IsCorrect = o.IsCorrect,
                        Points = o.Points
                    }).ToList()
                })
                .ToListAsync();

            return new PagedResult<QuestionDto>(items, total);
        }
    }
    }
