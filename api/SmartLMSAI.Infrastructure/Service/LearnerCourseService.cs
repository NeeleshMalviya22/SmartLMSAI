using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Progress;
using SmartLMSAI.Application.DTOs.QuizAttempt;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Application.Interfaces.IServices;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Service;

public class LearnerCourseService : ILearnerCourseService
{
    private readonly ICourseRepository _courseRepo;
    private readonly IEnrollmentRepository _enrollmentRepo;
    private readonly IModuleProgressRepository _progressRepo;
    private readonly IQuizRepository _quizRepo;
    private readonly IQuestionRepository _questionRepo;
    private readonly IQuizAttemptRepository _attemptRepo;

    public LearnerCourseService(
        ICourseRepository courseRepo,
        IEnrollmentRepository enrollmentRepo,
        IModuleProgressRepository progressRepo,
        IQuizRepository quizRepo,
        IQuestionRepository questionRepo,
        IQuizAttemptRepository attemptRepo)
    {
        _courseRepo = courseRepo;
        _enrollmentRepo = enrollmentRepo;
        _progressRepo = progressRepo;
        _quizRepo = quizRepo;
        _questionRepo = questionRepo;
        _attemptRepo = attemptRepo;
    }

    public async Task<ApiResponse<List<CourseProgressDto>>> GetAllCoursesForLearnerAsync(Guid learnerId)
    {
        var activeCourses = await _courseRepo.GetAllActiveWithModulesAsync();

        var progress = await _progressRepo.GetByLearnerAsync(learnerId);

        var enrollments = await _progressRepo.GetActiveByLearnerAsync(learnerId);

        var enrolledCourseIds = enrollments.Select(e => e.CourseId).ToHashSet();

        var result = activeCourses.Select(c =>
        {
            var modules = c.Modules
                .Where(m => !m.IsDeleted && m.IsActive)
                .OrderBy(m => m.OrderIndex)
                .ToList();

            var completedCount = modules.Count(m =>
                progress.Any(p => p.ModuleId == m.Id && p.Status == "COMPLETED"));
            var totalModules = modules.Count;

            return new CourseProgressDto
            {
                CourseId = c.Id,
                CourseTitle = c.Title,
                Description = c.Description,
                IsEnrolled = enrolledCourseIds.Contains(c.Id),
                TotalModules = totalModules,
                CompletedModules = completedCount,
                ProgressPercent = totalModules > 0
                    ? (int)Math.Round((double)completedCount / totalModules * 100)
                    : 0,
                AllModulesCompleted = totalModules > 0 && completedCount == totalModules
            };
        }).ToList();

        return ApiResponse<List<CourseProgressDto>>.Ok(result);
    }

    public async Task<ApiResponse<CourseProgressDto>> GetCourseDetailsForLearnerAsync(Guid courseId, Guid learnerId)
    {
        var course = await _courseRepo.GetByIdWithModulesAsync(courseId);

        if (course == null)
            return ApiResponse<CourseProgressDto>.Fail("Course not found");

        var isEnrolled = await _enrollmentRepo.ExistsAsync(courseId, learnerId);
        var progressList = await _progressRepo.GetByLearnerAsync(learnerId);

        var activeModules = course.Modules
            .Where(m => !m.IsDeleted && m.IsActive)
            .OrderBy(m => m.OrderIndex)
            .ToList();

        var moduleIds = activeModules.Select(m => m.Id).ToList();
        var quizzes = await _quizRepo.GetActiveByModuleIdsAsync(moduleIds);

        var modules = activeModules.Select(m =>
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
            ProgressPercent = totalModules > 0
                ? (int)Math.Round((double)completedCount / totalModules * 100)
                : 0,
            AllModulesCompleted = totalModules > 0 && completedCount == totalModules,
            Modules = modules
        };

        return ApiResponse<CourseProgressDto>.Ok(dto);
    }

    public async Task<ApiResponse<bool>> EnrollAsync(Guid courseId, Guid learnerId)
    {
        var exists = await _enrollmentRepo.ExistsAsync(courseId, learnerId);

        if (exists)
            return ApiResponse<bool>.Fail("Already enrolled in this course");

        var enrollment = new Enrollment
        {
            Id = Guid.NewGuid(),
            CourseId = courseId,
            LearnerId = learnerId,
            Status = "ACTIVE",
            CreatedOn = DateTime.UtcNow,
            CreatedBy = learnerId
        };

        await _enrollmentRepo.AddAsync(enrollment);
        await _enrollmentRepo.SaveChangesAsync();

        return ApiResponse<bool>.Ok(true, "Enrolled successfully");
    }

    public async Task<ApiResponse<bool>> MarkModuleCompleteAsync(Guid moduleId, Guid learnerId)
    {
        var existing = await _progressRepo.GetByModuleAndLearnerAsync(moduleId, learnerId);

        if (existing != null)
        {
            existing.Status = "COMPLETED";
            existing.CompletedOn = DateTime.UtcNow;
            existing.ModifiedOn = DateTime.UtcNow;
        }
        else
        {
            var progress = new ModuleProgress
            {
                Id = Guid.NewGuid(),
                ModuleId = moduleId,
                LearnerId = learnerId,
                Status = "COMPLETED",
                CompletedOn = DateTime.UtcNow,
                CreatedOn = DateTime.UtcNow,
                CreatedBy = learnerId
            };
            await _progressRepo.AddAsync(progress);
        }

        await _progressRepo.SaveChangesAsync();
        return ApiResponse<bool>.Ok(true);
    }

    public async Task<ApiResponse<QuizWithQuestionsDto>> GetQuizForAttemptAsync(Guid quizId)
    {
        var quiz = await _quizRepo.GetActiveByIdAsync(quizId);

        if (quiz == null)
            return ApiResponse<QuizWithQuestionsDto>.Fail("Quiz not found");

        var questions = await _questionRepo.GetByQuizIdWithOptionsAsync(quizId);

        var dto = new QuizWithQuestionsDto
        {
            QuizId = quiz.Id,
            Title = quiz.Title,
            Description = quiz.Description,
            PassingScore = quiz.PassingScore,
            Questions = questions
                .OrderBy(q => q.OrderIndex)
                .Select(q => new QuizQuestionDto
                {
                    QuestionId = q.Id,
                    QuestionText = q.QuestionText,
                    QuestionType = q.QuestionType?.TypeName ?? "MULTIPLE_CHOICE",
                    OrderIndex = q.OrderIndex,
                    Options = q.Options
                        .Where(o => !o.IsDeleted)
                        .Select(o => new QuizOptionDto
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
        var quiz = await _quizRepo.GetByIdAsync(dto.QuizId);

        if (quiz == null || quiz.IsDeleted)
            return ApiResponse<QuizAttemptResultDto>.Fail("Quiz not found");

        var questions = await _questionRepo.GetByQuizIdWithOptionsAsync(dto.QuizId);

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
        int score = totalQuestions > 0
            ? (int)Math.Round((double)correctCount / totalQuestions * 100)
            : 0;
        bool passed = score >= quiz.PassingScore;

        var attempt = new QuizAttempt
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

        await _attemptRepo.AddAsync(attempt);
        await _attemptRepo.SaveChangesAsync();

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
