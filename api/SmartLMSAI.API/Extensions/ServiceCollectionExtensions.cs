using Microsoft.Extensions.DependencyInjection;
using SmartLMSAI.Application.Interfaces.Services;
using SmartLMSAI.Application.Service;

namespace SmartLMSAI.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();

            return services;
        }
    }
}
