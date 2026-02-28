using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Courses;
using SmartLMSAI.Application.Interfaces;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Service;

public class CourseService : ICourseService
{
    private readonly ICourseRepository _repo;

    public CourseService(ICourseRepository repo)
    {
        _repo = repo;
    }

    public async Task<ApiResponse<List<CourseDto>>> GetAllAsync()
    {
        var courses = await _repo.GetAllAsync();

        var result = courses.Select(c => new CourseDto
        {
            Id = c.Id,
            Title = c.Title,
            Description = c.Description,
            IsActive = c.IsActive
        }).ToList();

        return ApiResponse<List<CourseDto>>.Ok(result);
    }

    public async Task<PagedResult<Course>> GetCoursesAsync(PagedRequest request)
    {
        return await _repo.GetCoursesAsync(request);
    }

    public async Task<ApiResponse<Guid>> CreateAsync(CreateCourseDto dto, string userId)
    {
        var course = new Course
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Description = dto.Description,
            IsActive = dto.IsActive,
            CreatedOn = DateTime.UtcNow,
            CreatedBy = userId
        };

        await _repo.AddAsync(course);
        await _repo.SaveChangesAsync();

        return ApiResponse<Guid>.Ok(course.Id);
    }

    public async Task<ApiResponse<bool>> UpdateAsync(Guid id, CreateCourseDto dto, string userId)
    {
        var course = await _repo.GetByIdAsync(id);

        if (course == null)
            return ApiResponse<bool>.Fail("Course not found");

        course.Title = dto.Title;
        course.Description = dto.Description;
        course.IsActive = dto.IsActive;

        course.ModifiedOn = DateTime.UtcNow;
        course.ModifiedBy = userId;

        _repo.Update(course);
        await _repo.SaveChangesAsync();

        return ApiResponse<bool>.Ok(true);
    }

    public async Task<ApiResponse<bool>> DeleteAsync(Guid id)
    {
        var course = await _repo.GetByIdAsync(id);

        if (course == null)
            return ApiResponse<bool>.Fail("Course not found");

        course.IsDeleted = true;
        course.ModifiedOn = DateTime.UtcNow;

        await _repo.SaveChangesAsync();

        return ApiResponse<bool>.Ok(true);
    }
}
