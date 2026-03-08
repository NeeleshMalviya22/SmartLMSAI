using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Questions;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Application.Interfaces.IServices;
using SmartLMSAI.Domain.Entities;
using SmartLMSAI.Infrastructure.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Infrastructure.Service
{
    public class QuestionService : IQuestionService
    {
        private readonly IQuestionRepository _repo;

        public QuestionService(IQuestionRepository repo)
        {
            _repo = repo;
        }

        public async Task<PagedResult<QuestionDto>> GetQuestionsAsync(PagedRequest request, Guid quizId)
        {
            return await _repo.GetQuestionsAsync(request, quizId);
        }

        public async Task<ApiResponse<Guid>> CreateAsync(CreateQuestionDto dto, Guid userId)
        {
            var question = new Question
            {
                Id = Guid.NewGuid(),
                QuizId = dto.QuizId,
                QuestionText = dto.QuestionText,
                QuestionTypeId = dto.QuestionTypeId,
                OrderIndex = dto.OrderIndex,
                CreatedOn = DateTime.UtcNow,
                CreatedBy = userId
            };

            foreach (var opt in dto.Options)
            {
                question.Options.Add(new QuestionOption
                {
                    Id = Guid.NewGuid(),
                    OptionText = opt.OptionText,
                    IsCorrect = opt.IsCorrect,
                    Points = opt.Points,
                    CreatedOn = DateTime.UtcNow,
                    CreatedBy = userId
                });
            }

            await _repo.AddAsync(question);
            await _repo.SaveChangesAsync();

            return ApiResponse<Guid>.Ok(question.Id);
        }

        public async Task<ApiResponse<bool>> DeleteAsync(Guid id)
        {
            var question = await _repo.GetByIdAsync(id);

            if (question == null)
                return ApiResponse<bool>.Fail("Question not found");

            question.IsDeleted = true;
            question.ModifiedOn = DateTime.UtcNow;

            await _repo.SaveChangesAsync();

            return ApiResponse<bool>.Ok(true);
        }
    }
}
