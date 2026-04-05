using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Document
{
      public class UploadDocumentDto
    {
        public Guid ModuleId { get; set; }

        public IFormFile File { get; set; } = null!;
    }
}
