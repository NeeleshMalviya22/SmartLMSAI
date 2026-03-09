using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Courses
{
    public class CourseDetailsDto : CourseDto
    {
        public string? CreatedOn { get; set; }
        public int ModuleCount { get; set; }
        public int LearnerCount { get; set; }
        public string? ModuleNames { get; set; }
    }
}
