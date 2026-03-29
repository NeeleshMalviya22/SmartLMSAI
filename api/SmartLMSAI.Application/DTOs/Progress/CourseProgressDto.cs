namespace SmartLMSAI.Application.DTOs.Progress;

public class CourseProgressDto
{
    public Guid CourseId { get; set; }
    public string CourseTitle { get; set; } = null!;
    public string? Description { get; set; }
    public bool IsEnrolled { get; set; }
    public int TotalModules { get; set; }
    public int CompletedModules { get; set; }
    public int ProgressPercent { get; set; }
    public bool AllModulesCompleted { get; set; }
    public bool QuizAvailable { get; set; }
    public List<ModuleProgressDto> Modules { get; set; } = new();
}

public class ModuleProgressDto
{
    public Guid ModuleId { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public int OrderIndex { get; set; }
    public string Status { get; set; } = "NOT_STARTED";
    public bool HasQuiz { get; set; }
    public Guid? QuizId { get; set; }
}
