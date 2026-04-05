using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Modules;
using SmartLMSAI.Application.Interfaces.IServices;
using System.Security.Claims;

namespace SmartLMSAI.API.Controllers;

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
        return Ok(await _service.CreateAsync(dto));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, CreateModuleDto dto)
    {
        return Ok(await _service.UpdateAsync(id, dto));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        return Ok(await _service.DeleteAsync(id));
    }
}
