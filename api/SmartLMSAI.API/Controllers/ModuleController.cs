using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMSAI.Application.DTOs.Modules;
using SmartLMSAI.Application.Interfaces.IServices;
using System.Security.Claims;

[ApiController]
[Route("api/modules")]
[Authorize]
public class ModuleController : ControllerBase
{
    private readonly IModuleService _service;

    public ModuleController(IModuleService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetModules([FromQuery] PagedRequest request)
    {
        return Ok(await _service.GetModulesAsync(request));
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateModuleDto dto)
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!Guid.TryParse(userIdValue, out var userId))
        {
            return Unauthorized();
        }

        return Ok(await _service.CreateAsync(dto));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, CreateModuleDto dto)
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!Guid.TryParse(userIdValue, out var userId))
        {
            return Unauthorized();
        }
        return Ok(await _service.UpdateAsync(userId, dto));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        return Ok(await _service.DeleteAsync(id));
    }

    [HttpGet("{courseId}")]
    public async Task<IActionResult> GetModuleByCourseAsync(Guid courseId)
    {
        var result = await _service.GetModuleByCourseAsync(courseId);
        return Ok(result);
    }
}