using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Questions
{
    public class QuestionDto
    {
        public Guid QuestionId { get; set; }

        public Guid QuizId { get; set; }

        public int QuestionTypeId { get; set; }

        public string QuestionType { get; set; } = null!;

        public string QuestionText { get; set; } = null!;

        public int OrderIndex { get; set; }

        public List<QuestionOptionDto> Options { get; set; } = new();
    }
}
