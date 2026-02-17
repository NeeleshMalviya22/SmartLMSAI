namespace SmartLMSAI.API.Extensions;

public static class CorsExtensions
{
    private const string CorsPolicyName = "SmartLMSAICors";

    public static IServiceCollection AddCorsPolicy(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(CorsPolicyName, builder =>
            {
                builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            });
        });

        return services;
    }

    public static IApplicationBuilder UseCorsPolicy(this IApplicationBuilder app)
    {
        app.UseCors(CorsPolicyName);
        return app;
    }
}
