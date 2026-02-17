using Microsoft.AspNetCore.Identity;

namespace SmartLMSAI.Infrastructure;

public class ApplicationUser : IdentityUser<Guid>
{
    public string FullName { get; set; } = default!;
    public bool IsActive { get; set; } = true;
}
