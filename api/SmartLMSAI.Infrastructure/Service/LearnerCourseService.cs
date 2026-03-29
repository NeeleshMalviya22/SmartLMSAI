using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Progress;
using SmartLMSAI.Application.DTOs.QuizAttempt;
using SmartLMSAI.Application.Interfaces.IServices;
using SmartLMSAI.Domain.Entities;
using System.Reflection;

namespace SmartLMSAI.Infrastructure.Service;

public class LearnerCourseService : ILearnerCourseService
{
    private readonly ApplicationDbContext _db;

    public LearnerCourseService(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<ApiResponse<List<CourseProgressDto>>> GetAllCoursesForLearnerAsync(Guid learnerId)
    {
        var courses = await _db.Courses
            .Where(c => !c.IsDeleted && c.IsActive)
            .Include(c => c.Modules)
            .AsNoTracking()
            .ToListAsync();

        var enrollments = await _db.Enrollments
            .Where(e => e.LearnerId == learnerId && !e.IsDeleted)
            .ToListAsync();

        var progress = await _db.ModuleProgress
            .Where(p => p.LearnerId == learnerId && !p.IsDeleted)
        .ToListAsync();

        var moduleDtos = courses.Select(m =>
        {
            var isCompleted = progress.Any(p => p.ModuleId == m.Id && p.Status == "COMPLETED");

            return new ModuleProgressDto
            {
                ModuleId = m.Id,
                Title = m.Title,
                Status = isCompleted ? "Completed" : "Not Started"
            };
        }).ToList();

        var result = courses.Select(c =>
        {
            var modules = c.Modules.Where(m => !m.IsDeleted && m.IsActive).OrderBy(m => m.OrderIndex).ToList();
            var isEnrolled = enrollments.Any(e => e.CourseId == c.Id);
            var completedCount = modules.Count(m => progress.Any(p => p.ModuleId == m.Id && p.Status == "COMPLETED"));
            var totalModules = modules.Count;

            return new CourseProgressDto
            {
                CourseId = c.Id,
                CourseTitle = c.Title,
                Description = c.Description,
                IsEnrolled = isEnrolled,
                TotalModules = totalModules,
                CompletedModules = completedCount,
                ProgressPercent = totalModules > 0 ? (int)Math.Round((double)completedCount / totalModules * 100) : 0,
                AllModulesCompleted = totalModules > 0 && completedCount == totalModules,
                Modules = moduleDtos
            };
        }).ToList();

        return ApiResponse<List<CourseProgressDto>>.Ok(result);
    }

    public async Task<ApiResponse<CourseProgressDto>> GetCourseDetailsForLearnerAsync(Guid courseId, Guid learnerId)
    {
        var course = await _db.Courses
            .Include(c => c.Modules)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == courseId && !c.IsDeleted);

        if (course == null)
            return ApiResponse<CourseProgressDto>.Fail("Course not found");

        var isEnrolled = await _db.Enrollments
            .AnyAsync(e => e.CourseId == courseId && e.LearnerId == learnerId && !e.IsDeleted);

        var progressList = await _db.ModuleProgress
            .Where(p => p.LearnerId == learnerId && !p.IsDeleted)
            .ToListAsync();

        var quizzes = await _db.Quizzes
            .Where(q => !q.IsDeleted && q.IsActive)
            .ToListAsync();

        var modules = course.Modules
            .Where(m => !m.IsDeleted && m.IsActive)
            .OrderBy(m => m.OrderIndex)
            .Select(m =>
            {
                var mp = progressList.FirstOrDefault(p => p.ModuleId == m.Id);
                var quiz = quizzes.FirstOrDefault(q => q.ModuleId == m.Id);
                return new ModuleProgressDto
                {
                    ModuleId = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    OrderIndex = m.OrderIndex,
                    Status = mp?.Status ?? "NOT_STARTED",
                    HasQuiz = quiz != null,
                    QuizId = quiz?.Id
                };
            }).ToList();

        var completedCount = modules.Count(m => m.Status == "COMPLETED");
        var totalModules = modules.Count;

        var dto = new CourseProgressDto
        {
            CourseId = course.Id,
            CourseTitle = course.Title,
            Description = course.Description,
            IsEnrolled = isEnrolled,
            TotalModules = totalModules,
            CompletedModules = completedCount,
            ProgressPercent = totalModules > 0 ? (int)Math.Round((double)completedCount / totalModules * 100) : 0,
            AllModulesCompleted = totalModules > 0 && completedCount == totalModules,
            Modules = modules
        };

        return ApiResponse<CourseProgressDto>.Ok(dto);
    }

    public async Task<ApiResponse<bool>> EnrollAsync(Guid courseId, Guid learnerId)
    {
        var exists = await _db.Enrollments
            .AnyAsync(e => e.CourseId == courseId && e.LearnerId == learnerId && !e.IsDeleted);

        if (exists)
            return ApiResponse<bool>.Fail("Already enrolled in this course");

        _db.Enrollments.Add(new Enrollment
        {
            Id = Guid.NewGuid(),
            CourseId = courseId,
            LearnerId = learnerId,
            Status = "ACTIVE",
            CreatedOn = DateTime.UtcNow,
            CreatedBy = learnerId
        });

        await _db.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true, "Enrolled successfully");
    }

    public async Task<ApiResponse<bool>> MarkModuleCompleteAsync(Guid moduleId, Guid learnerId)
    {
        var existing = await _db.ModuleProgress
            .FirstOrDefaultAsync(p => p.ModuleId == moduleId && p.LearnerId == learnerId && !p.IsDeleted);

        if (existing != null)
        {
            existing.Status = "COMPLETED";
            existing.CompletedOn = DateTime.UtcNow;
            existing.ModifiedOn = DateTime.UtcNow;
        }
        else
        {
            _db.ModuleProgress.Add(new ModuleProgress
            {
                Id = Guid.NewGuid(),
                ModuleId = moduleId,
                LearnerId = learnerId,
                Status = "COMPLETED",
                CompletedOn = DateTime.UtcNow,
                CreatedOn = DateTime.UtcNow,
                CreatedBy = learnerId
            });
        }

        await _db.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true);
    }

    public async Task<ApiResponse<QuizWithQuestionsDto>> GetQuizForAttemptAsync(Guid quizId)
    {
        var quiz = await _db.Quizzes
            .AsNoTracking()
            .FirstOrDefaultAsync(q => q.Id == quizId && !q.IsDeleted && q.IsActive);

        if (quiz == null)
            return ApiResponse<QuizWithQuestionsDto>.Fail("Quiz not found");

        var questions = await _db.Questions
            .Include(q => q.Options)
            .Include(q => q.QuestionType)
            .Where(q => q.QuizId == quizId && !q.IsDeleted)
            .OrderBy(q => q.OrderIndex)
            .AsNoTracking()
            .ToListAsync();

        var dto = new QuizWithQuestionsDto
        {
            QuizId = quiz.Id,
            Title = quiz.Title,
            Description = quiz.Description,
            PassingScore = quiz.PassingScore,
            Questions = questions.Select(q => new QuizQuestionDto
            {
                QuestionId = q.Id,
                QuestionText = q.QuestionText,
                QuestionType = q.QuestionType?.TypeName ?? "MULTIPLE_CHOICE",
                OrderIndex = q.OrderIndex,
                Options = q.Options.Where(o => !o.IsDeleted).Select(o => new QuizOptionDto
                {
                    OptionId = o.Id,
                    OptionText = o.OptionText
                }).ToList()
            }).ToList()
        };

        return ApiResponse<QuizWithQuestionsDto>.Ok(dto);
    }

    public async Task<ApiResponse<QuizAttemptResultDto>> SubmitQuizAsync(SubmitQuizDto dto, Guid learnerId)
    {
        var quiz = await _db.Quizzes
            .FirstOrDefaultAsync(q => q.Id == dto.QuizId && !q.IsDeleted);

        if (quiz == null)
            return ApiResponse<QuizAttemptResultDto>.Fail("Quiz not found");

        var questions = await _db.Questions
            .Include(q => q.Options)
            .Where(q => q.QuizId == dto.QuizId && !q.IsDeleted)
            .ToListAsync();

        int correctCount = 0;
        foreach (var answer in dto.Answers)
        {
            var question = questions.FirstOrDefault(q => q.Id == answer.QuestionId);
            if (question == null) continue;

            var correctOption = question.Options.FirstOrDefault(o => o.IsCorrect && !o.IsDeleted);
            if (correctOption != null && correctOption.Id == answer.SelectedOptionId)
                correctCount++;
        }

        int totalQuestions = questions.Count;
        int score = totalQuestions > 0 ? (int)Math.Round((double)correctCount / totalQuestions * 100) : 0;
        bool passed = score >= quiz.PassingScore;

        var attempt = new Domain.Entities.QuizAttempt
        {
            Id = Guid.NewGuid(),
            QuizId = dto.QuizId,
            LearnerId = learnerId,
            Score = score,
            TotalQuestions = totalQuestions,
            CorrectAnswers = correctCount,
            Passed = passed,
            AttemptDate = DateTime.UtcNow,
            CreatedOn = DateTime.UtcNow,
            CreatedBy = learnerId
        };

        _db.QuizAttempts.Add(attempt);
        await _db.SaveChangesAsync();

        return ApiResponse<QuizAttemptResultDto>.Ok(new QuizAttemptResultDto
        {
            AttemptId = attempt.Id,
            Score = score,
            TotalQuestions = totalQuestions,
            CorrectAnswers = correctCount,
            Passed = passed,
            PassingScore = quiz.PassingScore
        });
    }
}
