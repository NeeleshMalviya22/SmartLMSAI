using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Courses;
using SmartLMSAI.Application.Interfaces.IServices;
using System.Security.Claims;

namespace SmartLMSAI.API.Controllers;

[ApiController]
[Route("api/courses")]
[Authorize]
public class CourseController : ControllerBase
{
    private readonly ICourseService _service;

    public CourseController(ICourseService service)
    {
        _service = service;
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpGet]
    public async Task<IActionResult> GetCourses([FromQuery] PagedRequest request)
    {
        return Ok(await _service.GetCoursesAsync(request));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCourseDto dto)
    {
        if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
            return Unauthorized();

        return Ok(await _service.CreateAsync(dto, userId));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, CreateCourseDto dto)
    {
        if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
            return Unauthorized();

        return Ok(await _service.UpdateAsync(id, dto, userId));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        return Ok(await _service.DeleteAsync(id));
    }
}
