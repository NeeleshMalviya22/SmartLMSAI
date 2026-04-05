namespace SmartLMSAI.Application.Interfaces.IRepositories;

public interface IUserRepository
{
    Task<bool> UserExistsAsync(string email);
    Task<Guid> CreateUserAsync(string email, string password, string fullName);
    Task AddUserToRoleAsync(Guid userId, string role);
    Task<Guid?> ValidateUserAsync(string email, string password);
    Task<IList<string>> GetRolesAsync(Guid userId);
}
