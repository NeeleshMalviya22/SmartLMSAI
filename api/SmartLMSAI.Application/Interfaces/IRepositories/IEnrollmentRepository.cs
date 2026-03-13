using SmartLMSAI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.Interfaces.IRepositories
{
    public interface IEnrollmentRepository
    {
        Task<PagedResult<Enrollment>> GetEnrollmentsAsync(PagedRequest request);

        Task<Enrollment?> GetByIdAsync(Guid id);

        Task AddAsync(Enrollment entity);

        void Update(Enrollment entity);

        Task SaveChangesAsync();
    }
}
