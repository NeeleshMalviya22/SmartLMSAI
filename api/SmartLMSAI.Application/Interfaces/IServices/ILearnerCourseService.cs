using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Progress;
using SmartLMSAI.Application.DTOs.QuizAttempt;

namespace SmartLMSAI.Application.Interfaces.IServices;

public interface ILearnerCourseService
{
    Task<ApiResponse<List<CourseProgressDto>>> GetAllCoursesForLearnerAsync(Guid learnerId);
    Task<ApiResponse<CourseProgressDto>> GetCourseDetailsForLearnerAsync(Guid courseId, Guid learnerId);
    Task<ApiResponse<bool>> EnrollAsync(Guid courseId, Guid learnerId);
    Task<ApiResponse<bool>> MarkModuleCompleteAsync(Guid moduleId, Guid learnerId);
    Task<ApiResponse<QuizWithQuestionsDto>> GetQuizForAttemptAsync(Guid quizId);
    Task<ApiResponse<QuizAttemptResultDto>> SubmitQuizAsync(SubmitQuizDto dto, Guid learnerId);
}
