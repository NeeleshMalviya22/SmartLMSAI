namespace SmartLMSAI.Application.DTOs.QuizAttempt;

public class QuizAttemptResultDto
{
    public Guid AttemptId { get; set; }
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public int CorrectAnswers { get; set; }
    public bool Passed { get; set; }
    public int PassingScore { get; set; }
}
