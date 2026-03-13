using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Enrollments
{
    public class EnrollCourseDto
    {
        public Guid CourseId { get; set; }

        public Guid LearnerId { get; set; }

        public string Status { get; set; } = "ACTIVE";
    }
}
