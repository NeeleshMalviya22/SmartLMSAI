using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.Interfaces.IRepositories
{
    public interface ICloudinaryService
    {
        Task<string> UploadFileAsync(IFormFile file);
    }
}
