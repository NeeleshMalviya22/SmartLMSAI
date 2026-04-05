using Microsoft.AspNetCore.Identity;
using SmartLMSAI.Application.Interfaces.IRepositories;

namespace SmartLMSAI.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserRepository(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<bool> UserExistsAsync(string email)
        => await _userManager.FindByEmailAsync(email) != null;

    public async Task<Guid> CreateUserAsync(string email, string password, string fullName)
    {
        var user = new ApplicationUser
        {
            Email = email,
            UserName = email,
            FullName = fullName
        };

        var result = await _userManager.CreateAsync(user, password);
        if (!result.Succeeded)
            throw new ApplicationException(string.Join(", ", result.Errors.Select(e => e.Description)));

        return user.Id;
    }

    public async Task AddUserToRoleAsync(Guid userId, string role)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        await _userManager.AddToRoleAsync(user!, role);
    }

    public async Task<Guid?> ValidateUserAsync(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            return null;

        var valid = await _userManager.CheckPasswordAsync(user, password);
        return valid ? user.Id : null;
    }

    public async Task<IList<string>> GetRolesAsync(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        return await _userManager.GetRolesAsync(user!);
    }
}
