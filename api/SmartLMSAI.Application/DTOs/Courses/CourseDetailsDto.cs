using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.DTOs.Courses
{
    public class CourseDetailsDto : CourseDto
    {
        public DateTime CreatedOn { get; set; }
        public int ModuleCount { get; set; }
        public int LearnerCount { get; set; }
    }
}
