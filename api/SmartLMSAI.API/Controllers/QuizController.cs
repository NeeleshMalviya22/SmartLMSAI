using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Quizzes;
using SmartLMSAI.Application.Interfaces.IServices;
using System.Security.Claims;

namespace SmartLMSAI.API.Controllers;

[ApiController]
[Route("api/quizzes")]
[Authorize]
public class QuizController : ControllerBase
{
    private readonly IQuizService _service;

    public QuizController(IQuizService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] PagedRequest request)
    {
        return Ok(await _service.GetQuizzesAsync(request));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateQuizDto dto)
    {
        if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
            return Unauthorized();

        return Ok(await _service.CreateAsync(dto, userId));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, CreateQuizDto dto)
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
