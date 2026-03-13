using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Enrollments;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Application.Interfaces.IServices;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Service;

public class EnrollmentService : IEnrollmentService
{
    private readonly IEnrollmentRepository _repo;
    private readonly UserManager<ApplicationUser> _userManager;

    public EnrollmentService(
        IEnrollmentRepository repo,
        UserManager<ApplicationUser> userManager)
    {
        _repo = repo;
        _userManager = userManager;
    }

    public async Task<PagedResult<EnrollmentDto>> GetEnrollmentsAsync(PagedRequest request)
    {
        var paged = await _repo.GetEnrollmentsAsync(request);

        var users = await _userManager.GetUsersInRoleAsync("LEARNER");

        var mapped = new List<EnrollmentDto>();

        foreach (var user in users)
        {
            var enrollments = paged.Items
                .Where(e => e.LearnerId == user.Id)
                .ToList();
            if (enrollments.Any())
            {
                foreach (var enrollment in enrollments)
                {
                    mapped.Add(new EnrollmentDto
                    {
                        LearnerId = user.Id,
                        CourseTitle = enrollment.Course?.Title,
                        Name = user.FullName,
                        Email = user.Email,
                        Status = enrollment.Status,
                        EnrollmentDate = enrollment.CreatedOn
                    });
                }
            }
            else
            {
                mapped.Add(new EnrollmentDto
                {
                    LearnerId = user.Id,
                    CourseTitle = null,
                    Name = user.FullName,
                    Email = user.Email,
                    Status = null,
                    EnrollmentDate = null
                });
            }
        }

        return new PagedResult<EnrollmentDto>(mapped, mapped.Count);
    }
    public async Task<ApiResponse<Guid>> EnrollAsync(EnrollCourseDto dto, Guid userId)
    {
        var entity = new Enrollment
        {
            Id = Guid.NewGuid(),
            CourseId = dto.CourseId,
            LearnerId = dto.LearnerId,
            Status = dto.Status,
            CreatedOn = DateTime.UtcNow,
            CreatedBy = userId
        };

        await _repo.AddAsync(entity);
        await _repo.SaveChangesAsync();

        return ApiResponse<Guid>.Ok(entity.Id);
    }

    public async Task<ApiResponse<bool>> DeleteAsync(Guid id)
    {
        var entity = await _repo.GetByIdAsync(id);

        if (entity == null)
            return ApiResponse<bool>.Fail("Enrollment not found");

        entity.IsDeleted = true;
        entity.ModifiedOn = DateTime.UtcNow;

        await _repo.SaveChangesAsync();

        return ApiResponse<bool>.Ok(true);
    }
}