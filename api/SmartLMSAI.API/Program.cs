using Microsoft.EntityFrameworkCore;
using SmartLMSAI.API.Extensions;
using SmartLMSAI.Infrastructure.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
builder.Services.AddCorsPolicy();

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddIdentityConfiguration();
builder.Services.AddApplicationServices();
builder.Services.AddJwtAuthentication(builder.Configuration);


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<SmartLMSAI.Infrastructure.ApplicationDbContext>();
    await db.Database.MigrateAsync();

    await RoleSeeder.SeedAsync(scope.ServiceProvider);
    await QuestionTypeSeeder.SeedAsync(scope.ServiceProvider);
}

app.UseCorsPolicy();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
