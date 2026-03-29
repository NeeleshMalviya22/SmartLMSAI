namespace SmartLMSAI.Domain.Entities;

public class QuizAttempt : BaseEntity
{
    public Guid QuizId { get; set; }
    public Guid LearnerId { get; set; }
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public int CorrectAnswers { get; set; }
    public bool Passed { get; set; }
    public DateTime AttemptDate { get; set; } = DateTime.UtcNow;
    public Quiz Quiz { get; set; } = null!;
}
