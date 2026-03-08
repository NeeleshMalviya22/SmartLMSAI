using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Questions
{
    public class CreateOptionDto
    {
        public string OptionText { get; set; } = null!;

        public bool IsCorrect { get; set; }

        public int Points { get; set; } = 1;
    }
}
