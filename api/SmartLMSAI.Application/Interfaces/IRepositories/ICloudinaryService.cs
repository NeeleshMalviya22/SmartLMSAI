using Microsoft.AspNetCore.Http;

namespace SmartLMSAI.Application.Interfaces.IRepositories;

public interface ICloudinaryService
{
    Task<string> UploadFileAsync(IFormFile file);
}
