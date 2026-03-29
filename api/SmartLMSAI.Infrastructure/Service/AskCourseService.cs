using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.AskCourse;
using SmartLMSAI.Application.Interfaces;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Application.Interfaces.IServices;

namespace SmartLMSAI.Infrastructure.Service;

/// <summary>
/// Placeholder implementation of IAskCourseService.
/// Replace the body of AskAsync with your own RAG application call.
/// The DTOs, controller, and frontend are already wired up.
/// </summary>
public class AskCourseService : IAskCourseService
{
    private readonly IDocumentRepository _documentRepo;
    private readonly IConfiguration _config;
    private readonly ILogger<AskCourseService> _logger;
    public readonly IAiService aiService;

    public AskCourseService(
        IDocumentRepository documentRepo,
        IConfiguration config,
        ILogger<AskCourseService> logger,
        IAiService aiService)
    {
        _documentRepo = documentRepo;
        _config = config;
        _logger = logger;
        this.aiService = aiService; 
    }

    public async Task<ApiResponse<AskCourseResponseDto>> AskAsync(AskCourseRequestDto request)
    {
        var documents = await _documentRepo.GetByCourseWithTextAsync(request.CourseId);

        if (documents.Count == 0)
        {
            return ApiResponse<AskCourseResponseDto>.Fail(
                "No documents with extracted text found for this course. Please ask the admin to upload course materials.");
        }
        var aiAnswer = await aiService.AskAsync(request.Question, documents.Select(x=>x.ExtractedText).ToList());
        var placeholderResponse = new AskCourseResponseDto
        {
            Answer = $"[Placeholder] Your question \"{request.Question}\" was received. " +
                     $"Found {documents.Count} document(s) for this course. " +
                     "Connect your RAG application to get real AI-powered answers.",
            Excerpt = aiAnswer,
            SourceDocument = documents.FirstOrDefault()?.FileName ?? "N/A"
        };

        return ApiResponse<AskCourseResponseDto>.Ok(placeholderResponse);
    }
}
