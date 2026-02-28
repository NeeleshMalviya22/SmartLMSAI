using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Auth;
using SmartLMSAI.Application.Interfaces.Repositories;
using SmartLMSAI.Application.Interfaces.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SmartLMSAI.Application.Service;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _config;
    private readonly ILogger<AuthService> _logger;

    public AuthService(IUserRepository userRepository, IConfiguration config, ILogger<AuthService> logger)
    {
        _userRepository = userRepository;
        _config = config;
        _logger = logger;
    }

    public async Task<ApiResponse<AuthResponseDto>> RegisterAsync(RegisterRequestDto dto)
    {
        if (await _userRepository.UserExistsAsync(dto.Email))
        {
            return ApiResponse<AuthResponseDto>.Fail("User already exists");
        }

        var userId = await _userRepository.CreateUserAsync(
            dto.Email, dto.Password, dto.FullName);

        await _userRepository.AddUserToRoleAsync(userId, dto.Role);

        return ApiResponse<AuthResponseDto>.Ok(new AuthResponseDto
        {
            UserId = userId,
            Email = dto.Email,
            Role = dto.Role
        }, "Registration successful");
    }

    public async Task<ApiResponse<AuthResponseDto>> LoginAsync(LoginRequestDto dto)
    {
        var userId = await _userRepository.ValidateUserAsync(dto.Email, dto.Password);
        if (userId == null)
        {
            return ApiResponse<AuthResponseDto>.Fail("Invalid credentials");
        }

        var roles = await _userRepository.GetRolesAsync(userId.Value);
        var role = roles.FirstOrDefault() ?? string.Empty;

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, userId.ToString()!),
            new(ClaimTypes.Role, role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]!));

        var token = new JwtSecurityToken(
            issuer: _config["JwtSettings:Issuer"],
            audience: _config["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return ApiResponse<AuthResponseDto>.Ok(
            new AuthResponseDto
            {
                UserId = userId.Value,
                Role = role,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo
            },
            "Login successful");
    }
}
