using SmartLMSAI.Application.DTOs.Courses;
using SmartLMSAI.Domain.Entities;

public interface ICourseRepository
{
    Task AddAsync(Course course);
    Task<Course?> GetByIdAsync(Guid id);
    Task<List<Course>> GetAllAsync();
    void Update(Course course);
    void Delete(Course course);
    Task SaveChangesAsync();
    Task<PagedResult<CourseDetailsDto>> GetCoursesAsync(PagedRequest request);
}