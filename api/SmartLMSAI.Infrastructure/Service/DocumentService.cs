using Microsoft.Extensions.Logging;
using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Document;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Application.Interfaces.IServices;
using SmartLMSAI.Domain.Entities;

namespace SmartLMSAI.Infrastructure.Service;

public class DocumentService : IDocumentService
{
    private readonly IDocumentRepository _repo;
    private readonly IPdfTextExtractor _pdfTextExtractor;
    private readonly ILogger<DocumentService> _logger;

    public DocumentService(
        IDocumentRepository repo,
        IPdfTextExtractor pdfTextExtractor,
        ILogger<DocumentService> logger)
    {
        _repo = repo;
        _pdfTextExtractor = pdfTextExtractor;
        _logger = logger;
    }

    public async Task<PagedResult<DocumentDto>> GetDocumentsAsync(PagedRequest request)
    {
        var paged = await _repo.GetPagedAsync(request);

        var mapped = paged.Items.Select(d => new DocumentDto
        {
            Id = d.Id,
            ModuleId = d.ModuleId,
            ModuleName = d.Module.Title,
            FileName = d.FileName,
            FilePath = d.FilePath,
            FileSize = d.FileSize,
            CreatedOn = d.CreatedOn.ToString("dd MMM yyyy")
        }).ToList();

        return new PagedResult<DocumentDto>(mapped, paged.TotalCount);
    }

    public async Task<ApiResponse<Guid>> UploadAsync(UploadDocumentDto dto, Guid userId)
    {
        var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "documents");

        if (!Directory.Exists(uploadFolder))
            Directory.CreateDirectory(uploadFolder);

        var filename = $"{Guid.NewGuid()}_{dto.File.FileName}";
        var filePath = Path.Combine(uploadFolder, filename);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await dto.File.CopyToAsync(stream);
        }

        string? extractedText = null;
        if (dto.File.ContentType == "application/pdf")
        {
            try
            {
                using var pdfStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
                extractedText = await _pdfTextExtractor.ExtractTextAsync(pdfStream);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to extract text from PDF: {FileName}", dto.File.FileName);
            }
        }

        var document = new Document
        {
            Id = Guid.NewGuid(),
            ModuleId = dto.ModuleId,
            FileName = dto.File.FileName,
            FilePath = $"/uploads/documents/{filename}",
            CreatedOn = DateTime.UtcNow,
            CreatedBy = userId,
            FileSize = dto.File.Length,
            ContentType = dto.File.ContentType,
            ExtractedText = extractedText
        };

        await _repo.AddAsync(document);
        await _repo.SaveChangesAsync();

        return ApiResponse<Guid>.Ok(document.Id);
    }

    public async Task<ApiResponse<bool>> DeleteAsync(Guid id)
    {
        var doc = await _repo.GetByIdAsync(id);

        if (doc == null)
            return ApiResponse<bool>.Fail("Document not found");

        doc.IsDeleted = true;
        doc.ModifiedOn = DateTime.UtcNow;

        await _repo.SaveChangesAsync();

        return ApiResponse<bool>.Ok(true);
    }
}
