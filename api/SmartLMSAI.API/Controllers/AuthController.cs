using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartLMSAI.Application.DTOs.Auth;
using SmartLMSAI.Application.Interfaces.IServices;

namespace SmartLMSAI.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register(RegisterRequestDto dto)
    {
        var response = await _authService.RegisterAsync(dto);
        return response.Success ? Ok(response) : BadRequest(response);
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequestDto dto)
    {
        var response = await _authService.LoginAsync(dto);
        return response.Success ? Ok(response) : Unauthorized(response);
    }
}
