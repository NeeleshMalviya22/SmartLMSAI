using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SmartLMSAI.Application.Interfaces;
using SmartLMSAI.Application.Interfaces.Repositories;
using SmartLMSAI.Infrastructure;
using SmartLMSAI.Infrastructure.Repositories;

namespace SmartLMSAI.API.Extensions
{
    public static class InfrastructureExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IUserRepository, UserRepository>()
                     .AddScoped<ICourseRepository, CourseRepository>();

            return services;
        }
    }
}
