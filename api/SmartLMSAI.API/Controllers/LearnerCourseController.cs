using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMSAI.Application.DTOs.QuizAttempt;
using SmartLMSAI.Application.Interfaces.IServices;
using System.Security.Claims;

namespace SmartLMSAI.API.Controllers;

[ApiController]
[Route("api/learner")]
[Authorize]
public class LearnerCourseController : ControllerBase
{
    private readonly ILearnerCourseService _service;

    public LearnerCourseController(ILearnerCourseService service)
    {
        _service = service;
    }

    private Guid? GetUserId()
    {
        var val = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(val, out var id) ? id : null;
    }

    [HttpGet("courses")]
    public async Task<IActionResult> GetCourses()
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();
        return Ok(await _service.GetAllCoursesForLearnerAsync(userId.Value));
    }

    [HttpGet("courses/{courseId}")]
    public async Task<IActionResult> GetCourseDetails(Guid courseId)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();
        return Ok(await _service.GetCourseDetailsForLearnerAsync(courseId, userId.Value));
    }

    [HttpPost("enroll/{courseId}")]
    public async Task<IActionResult> Enroll(Guid courseId)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();
        return Ok(await _service.EnrollAsync(courseId, userId.Value));
    }

    [HttpPost("modules/{moduleId}/complete")]
    public async Task<IActionResult> MarkModuleComplete(Guid moduleId)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();
        return Ok(await _service.MarkModuleCompleteAsync(moduleId, userId.Value));
    }

    [HttpGet("quiz/{quizId}")]
    public async Task<IActionResult> GetQuiz(Guid quizId)
    {
        return Ok(await _service.GetQuizForAttemptAsync(quizId));
    }

    [HttpPost("quiz/submit")]
    public async Task<IActionResult> SubmitQuiz([FromBody] SubmitQuizDto dto)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();
        return Ok(await _service.SubmitQuizAsync(dto, userId.Value));
    }
}
