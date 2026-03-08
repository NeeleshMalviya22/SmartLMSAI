using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Domain.Entities
{
    public class Question : BaseEntity
    {
        public Guid QuizId { get; set; }

        public int QuestionTypeId { get; set; }

        public string QuestionText { get; set; } = null!;

        public int OrderIndex { get; set; }

        public Quiz Quiz { get; set; } = null!;

        public QuestionType QuestionType { get; set; } = null!;

        public ICollection<QuestionOption> Options { get; set; } = new List<QuestionOption>();
    }
}
