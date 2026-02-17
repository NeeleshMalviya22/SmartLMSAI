using SmartLMSAI.API.Extensions;
using SmartLMSAI.Infrastructure.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCorsPolicy();

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddIdentityConfiguration();
builder.Services.AddApplicationServices();
//builder.Services.AddJwtAuthentication(builder.Configuration);


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    await RoleSeeder.SeedAsync(scope.ServiceProvider);
}

app.UseCorsPolicy();        // ✅ FIRST
app.UseAuthentication();    // ✅ SECOND
app.UseAuthorization();     // ✅ THIRD
app.UseHttpsRedirection();

app.MapControllers();
app.Run();
