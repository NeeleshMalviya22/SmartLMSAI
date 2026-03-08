using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Domain.Entities
{
    public class QuestionType
    {
        public int Id { get; set; }
        public string TypeName { get; set; } = null!;

        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
