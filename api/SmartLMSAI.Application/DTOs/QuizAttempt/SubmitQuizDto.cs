namespace SmartLMSAI.Application.DTOs.QuizAttempt;

public class SubmitQuizDto
{
    public Guid QuizId { get; set; }
    public List<AnswerDto> Answers { get; set; } = new();
}

public class AnswerDto
{
    public Guid QuestionId { get; set; }
    public Guid SelectedOptionId { get; set; }
}
