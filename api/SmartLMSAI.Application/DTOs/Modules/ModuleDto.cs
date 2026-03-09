using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Modules
{
    public class ModuleDto
    {
        public Guid ModuleId { get; set; }
        public Guid CourseId { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public int OrderIndex { get; set; }
        public bool IsActive { get; set; }
        public string? CourseName { get; set; }
        public string? CreatedOn { get; set; }
    }
}
