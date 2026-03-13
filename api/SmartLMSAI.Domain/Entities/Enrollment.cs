using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Domain.Entities
{
    public class Enrollment : BaseEntity
    {
        public Guid CourseId { get; set; }

        public Guid LearnerId { get; set; }

        public string Status { get; set; } = "ACTIVE";

        public DateTime? CompletionDate { get; set; }

        public virtual Course Course { get; set; }

    }
}
