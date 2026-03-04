using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Quizzes
{
    public class CreateQuizDto
    {
        public Guid ModuleId { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public int PassingScore { get; set; } = 70;
        public bool IsActive { get; set; } = true;

    }
}
