using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Infrastructure;
using SmartLMSAI.Infrastructure.Repositories;

namespace SmartLMSAI.API.Extensions;

public static class InfrastructureExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IUserRepository, UserRepository>()
                .AddScoped<ICourseRepository, CourseRepository>()
                .AddScoped<IModuleRepository, ModuleRepository>()
                .AddScoped<IQuizRepository, QuizRepository>()
                .AddScoped<IQuestionRepository, QuestionRepository>()
                .AddScoped<IDocumentRepository, DocumentRepository>()
                .AddScoped<IEnrollmentRepository, EnrollmentRepository>()
                .AddScoped<IModuleProgressRepository, ModuleProgressRepository>()
                .AddScoped<IQuizAttemptRepository, QuizAttemptRepository>();

        return services;
    }
}
