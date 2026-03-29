namespace SmartLMSAI.Application.DTOs.AskCourse;

public class AskCourseRequestDto
{
    public Guid CourseId { get; set; }
    public string Question { get; set; } = null!;
}
