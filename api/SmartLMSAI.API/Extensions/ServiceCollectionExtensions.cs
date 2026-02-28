using Microsoft.Extensions.DependencyInjection;
using SmartLMSAI.Application.Interfaces;
using SmartLMSAI.Application.Interfaces.Services;
using SmartLMSAI.Application.Service;
using SmartLMSAI.Infrastructure.Service;

namespace SmartLMSAI.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>()
                    .AddScoped<ICourseService, CourseService>();
            return services;
        }
    }
}
