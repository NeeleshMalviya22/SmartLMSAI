using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Quizzes;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Application.Interfaces.IServices;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Service;

public class QuizService : IQuizService
{
    private readonly IQuizRepository _repo;

    public QuizService(IQuizRepository repo)
    {
        _repo = repo;
    }

    public async Task<PagedResult<QuizDto>> GetQuizzesAsync(PagedRequest request)
    {
        var paged = await _repo.GetQuizzesAsync(request);

        var mapped = paged.Items.Select(q => new QuizDto
        {
            QuizId = q.Id,
            ModuleId = q.ModuleId,
            ModuleTitle = q.Module?.Title ?? "",
            Title = q.Title,
            Description = q.Description,
            PassingScore = q.PassingScore,
            IsActive = q.IsActive
        }).ToList();

        return new PagedResult<QuizDto>(mapped, paged.TotalCount);
    }

    public async Task<ApiResponse<Guid>> CreateAsync(CreateQuizDto dto, Guid userId)
    {
        var quiz = new Quiz
        {
            Id = Guid.NewGuid(),
            ModuleId = dto.ModuleId,
            Title = dto.Title,
            Description = dto.Description,
            PassingScore = dto.PassingScore,
            IsActive = dto.IsActive,
            CreatedOn = DateTime.UtcNow,
            CreatedBy = userId
        };

        await _repo.AddAsync(quiz);
        await _repo.SaveChangesAsync();

        return ApiResponse<Guid>.Ok(quiz.Id);
    }

    public async Task<ApiResponse<bool>> UpdateAsync(Guid id, CreateQuizDto dto, Guid userId)
    {
        var quiz = await _repo.GetByIdAsync(id);

        if (quiz == null)
            return ApiResponse<bool>.Fail("Quiz not found");

        quiz.Title = dto.Title;
        quiz.Description = dto.Description;
        quiz.PassingScore = dto.PassingScore;
        quiz.IsActive = dto.IsActive;
        quiz.ModifiedOn = DateTime.UtcNow;
        quiz.ModifiedBy = userId;

        _repo.Update(quiz);
        await _repo.SaveChangesAsync();

        return ApiResponse<bool>.Ok(true);
    }

    public async Task<ApiResponse<bool>> DeleteAsync(Guid id)
    {
        var quiz = await _repo.GetByIdAsync(id);

        if (quiz == null)
            return ApiResponse<bool>.Fail("Quiz not found");

        quiz.IsDeleted = true;
        quiz.ModifiedOn = DateTime.UtcNow;

        await _repo.SaveChangesAsync();

        return ApiResponse<bool>.Ok(true);
    }
}
