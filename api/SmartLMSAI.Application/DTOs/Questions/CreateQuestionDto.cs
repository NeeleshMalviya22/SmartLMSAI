using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Questions
{
    public class CreateQuestionDto
    {
        public Guid QuizId { get; set; }

        public int QuestionTypeId { get; set; }

        public string QuestionText { get; set; } = null!;

        public int OrderIndex { get; set; }

        public List<CreateOptionDto> Options { get; set; } = new();
    }
}
