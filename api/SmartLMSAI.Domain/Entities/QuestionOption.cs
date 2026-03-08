using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Domain.Entities
{
    public class QuestionOption : BaseEntity
    {
        public Guid QuestionId { get; set; }

        public string OptionText { get; set; } = null!;

        public bool IsCorrect { get; set; }

        public int Points { get; set; } = 1;

        public Question Question { get; set; } = null!;
    }
}
