using SmartLMSAI.Application.DTOs.Questions;

namespace SmartLMSAI.Application.DTOs.QuizAttempt;

public class QuizWithQuestionsDto
{
    public Guid QuizId { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public int PassingScore { get; set; }
    public List<QuizQuestionDto> Questions { get; set; } = new();
}

public class QuizQuestionDto
{
    public Guid QuestionId { get; set; }
    public string QuestionText { get; set; } = null!;
    public string QuestionType { get; set; } = null!;
    public int OrderIndex { get; set; }
    public List<QuizOptionDto> Options { get; set; } = new();
}

public class QuizOptionDto
{
    public Guid OptionId { get; set; }
    public string OptionText { get; set; } = null!;
}
