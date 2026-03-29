namespace SmartLMSAI.Application.DTOs.AskCourse;

public class AskCourseResponseDto
{
    public string Answer { get; set; } = null!;
    public string? Excerpt { get; set; }
    public string? SourceDocument { get; set; }
}
