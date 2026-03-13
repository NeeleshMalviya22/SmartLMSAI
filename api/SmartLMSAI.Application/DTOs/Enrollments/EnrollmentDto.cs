using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Enrollments
{
    public class EnrollmentDto
    {
        public Guid Id { get; set; }
        public Guid? CourseId { get; set; }
        public Guid? LearnerId { get; set; }
        public string? CourseTitle { get; set; } = "";
        public string? Name { get; set; } = "";
        public string? Status { get; set; } = "";
        public string? Email { get; set; } = "";
        public DateTime? EnrollmentDate { get; set; }
    }
}
