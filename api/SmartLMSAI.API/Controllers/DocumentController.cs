using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Document;
using SmartLMSAI.Application.Interfaces.IServices;
using System.Security.Claims;

namespace SmartLMSAI.API.Controllers;

[ApiController]
[Route("api/documents")]
[Authorize]
public class DocumentController : ControllerBase
{
    private readonly IDocumentService _service;

    public DocumentController(IDocumentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetDocuments([FromQuery] PagedRequest request)
    {
        return Ok(await _service.GetDocumentsAsync(request));
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm] UploadDocumentDto dto)
    {
        if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
            return Unauthorized();

        return Ok(await _service.UploadAsync(dto, userId));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        return Ok(await _service.DeleteAsync(id));
    }
}
