using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMSAI.Application.DTOs.AskCourse;
using SmartLMSAI.Application.Interfaces.IServices;

namespace SmartLMSAI.API.Controllers;

[ApiController]
[Route("api/ask-course")]
[Authorize]
public class AskCourseController : ControllerBase
{
    private readonly IAskCourseService _service;

    public AskCourseController(IAskCourseService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Ask([FromBody] AskCourseRequestDto request)
    {
        var result = await _service.AskAsync(request);
        return Ok(result);
    }
}
