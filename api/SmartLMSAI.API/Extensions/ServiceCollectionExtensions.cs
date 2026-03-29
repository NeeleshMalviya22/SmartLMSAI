using Microsoft.Extensions.DependencyInjection;
using SmartLMSAI.Application.Interfaces;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Application.Interfaces.IServices;
using SmartLMSAI.Application.Interfaces.Services;
using SmartLMSAI.Application.Service;
using SmartLMSAI.Infrastructure.Service;
using SmartLMSAI.Infrastructure.Services;

namespace SmartLMSAI.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>()
                    .AddScoped<ICourseService, CourseService>()
                    .AddScoped<IModuleService, ModuleService>()
                    .AddScoped<IQuizService, QuizService>()
                    .AddScoped<IQuestionService, QuestionService>()
                    .AddScoped<IDocumentService, DocumentService>()
                    .AddScoped<ICloudinaryService, CloudinaryService>()
                    .AddScoped<IEnrollmentService, EnrollmentService>()
                    .AddScoped<IPdfTextExtractor, PdfTextExtractorService>()
                    .AddScoped<IAskCourseService, AskCourseService>()
                    .AddScoped<ILearnerCourseService, LearnerCourseService>()
                    .AddScoped<IAiService, AiService>();
            return services;
        }
    }
}
