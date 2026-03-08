using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartLMSAI.Application.DTOs.Questions;
using SmartLMSAI.Application.Interfaces.IServices;
using System.Security.Claims;

namespace SmartLMSAI.API.Controllers
{
    [ApiController]
    [Route("api/questions")]
    [Authorize]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionService _service;

        public QuestionController(IQuestionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetQuestions(
            [FromQuery] PagedRequest request,
            [FromQuery] Guid quizId)
        {
            return Ok(await _service.GetQuestionsAsync(request, quizId));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateQuestionDto dto)
        {
            var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(userIdValue, out var userId))
                return Unauthorized();

            return Ok(await _service.CreateAsync(dto, userId));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok(await _service.DeleteAsync(id));
        }
    }
}
