using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Document
{
    public class DocumentDto
    {
        public Guid Id { get; set; }

        public Guid ModuleId { get; set; }

        public string? ModuleName { get; set; }  

        public string FileName { get; set; } = null!;

        public string FilePath { get; set; } = null!;

        public string? CreatedOn { get; set; }

        public long FileSize { get; set; }
    }
}
