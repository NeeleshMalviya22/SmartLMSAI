using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Auth;

namespace SmartLMSAI.Application.Interfaces.IServices;

public interface IAuthService
{
    Task<ApiResponse<AuthResponseDto>> RegisterAsync(RegisterRequestDto dto);
    Task<ApiResponse<AuthResponseDto>> LoginAsync(LoginRequestDto dto);
}
