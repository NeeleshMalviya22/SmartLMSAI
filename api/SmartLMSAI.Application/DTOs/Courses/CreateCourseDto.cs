namespace SmartLMSAI.Application.DTOs.Courses;

public class CreateCourseDto
{
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
}
