using Microsoft.Extensions.DependencyInjection;
using SmartLMSAI.Infrastructure;
using SmartLMSAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace SmartLMSAI.Infrastructure.DependencyInjection;

public static class QuestionTypeSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var db = services.GetRequiredService<ApplicationDbContext>();

        if (!await db.QuestionTypes.AnyAsync())
        {
            db.QuestionTypes.AddRange(
                new QuestionType
                {
                    Id = 1,
                    TypeName = "MULTIPLE_CHOICE"
                },
                new QuestionType
                {
                    Id = 2,
                    TypeName = "TRUE_FALSE"
                }
            );

            await db.SaveChangesAsync();
        }
    }
}