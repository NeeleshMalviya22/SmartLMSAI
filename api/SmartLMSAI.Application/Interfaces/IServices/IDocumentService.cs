using SmartLMSAI.Application.DTOs.Document;

namespace SmartLMSAI.Application.Interfaces;

public interface IDocumentService
{
    Task<Guid> UploadAsync(UploadDocumentDto dto, Guid userId);


    Task<bool> DeleteAsync(Guid id);

    Task<PagedResult<DocumentDto>> GetDocumentsAsync(PagedRequest request);
}