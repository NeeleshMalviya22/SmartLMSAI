using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Document;

namespace SmartLMSAI.Application.Interfaces.IServices;

public interface IDocumentService
{
    Task<PagedResult<DocumentDto>> GetDocumentsAsync(PagedRequest request);
    Task<ApiResponse<Guid>> UploadAsync(UploadDocumentDto dto, Guid userId);
    Task<ApiResponse<bool>> DeleteAsync(Guid id);
}
