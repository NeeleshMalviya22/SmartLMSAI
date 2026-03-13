using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Enrollments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.Interfaces.IServices
{
    public interface IEnrollmentService
    {
        Task<PagedResult<EnrollmentDto>> GetEnrollmentsAsync(PagedRequest request);

        Task<ApiResponse<Guid>> EnrollAsync(EnrollCourseDto dto, Guid userId);

        Task<ApiResponse<bool>> DeleteAsync(Guid id);
    }
}
