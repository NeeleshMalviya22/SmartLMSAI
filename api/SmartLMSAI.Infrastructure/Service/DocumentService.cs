using SmartLMSAI.Application.DTOs.Document;
using SmartLMSAI.Application.Interfaces;
using SmartLMSAI.Application.Interfaces.IRepositories;
using SmartLMSAI.Domain.Entities;
using SmartLMSAI.Infrastructure.Repositories;
using System;
using System.IO;

namespace SmartLMSAI.Infrastructure.Service;

public class DocumentService : IDocumentService
{
    private readonly IDocumentRepository _repo;
    private readonly ICloudinaryService _cloudinaryService;

    public DocumentService(IDocumentRepository repo, ICloudinaryService cloudinaryService)
    {
        _repo = repo;
        _cloudinaryService = cloudinaryService;
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

    public async Task<Guid> UploadAsync(UploadDocumentDto dto, Guid userId)
    {
        var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "documents"
        );

        if (!Directory.Exists(uploadFolder))
            Directory.CreateDirectory(uploadFolder);

        var filename = $"{Guid.NewGuid()}_{dto.File.FileName}";

        var filePath = Path.Combine(uploadFolder, filename);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await dto.File.CopyToAsync(stream);
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
            ContentType = dto.File.ContentType
        };

        await _repo.AddAsync(document);
        await _repo.SaveChangesAsync();

        return document.Id;


    }

    //public async Task<Guid> UploadAsync(UploadDocumentDto dto, Guid userId)
    //{
    //    // Upload to Cloudinary
    //    var fileUrl = await _cloudinaryService.UploadFileAsync(dto.File);

    //    var document = new Document
    //    {
    //        Id = Guid.NewGuid(),
    //        ModuleId = dto.ModuleId,
    //        FileName = dto.File.FileName,
    //        FilePath = fileUrl,
    //        FileSize = dto.File.Length,
    //        ContentType = dto.File.ContentType,
    //        CreatedOn = DateTime.UtcNow,
    //        CreatedBy = userId
    //    };

    //    await _repo.AddAsync(document);
    //    await _repo.SaveChangesAsync();

    //    return document.Id;
    //}


    public async Task<bool> DeleteAsync(Guid id)
    {
        var doc = await _repo.GetByIdAsync(id);

        if (doc == null)
            return false;

        doc.IsDeleted = true;
        doc.ModifiedOn = DateTime.UtcNow;

        await _repo.SaveChangesAsync();

        return true;
    }
}