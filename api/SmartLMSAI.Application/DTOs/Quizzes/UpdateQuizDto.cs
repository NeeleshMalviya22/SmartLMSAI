using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Quizzes
{
    public class UpdateQuizDto
    {
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public int PassingScore { get; set; }
        public bool IsActive { get; set; }
    }
}
