using SmartLMSAI.Application.Common;
using SmartLMSAI.Application.DTOs.Courses;
using SmartLMSAI.Application.DTOs.Modules;
using SmartLMSAI.Application.Interfaces.IServices;
using SmartLMSAI.Domain.Entities;
using SmartLMSAI.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Infrastructure.Service
{
    public class ModuleService : IModuleService
    {
        private readonly IModuleRepository _repo;

        public ModuleService(IModuleRepository repo)
        {
            _repo = repo;
        }

        public async Task<PagedResult<ModuleDto>> GetModulesAsync(PagedRequest request)
        {
            var paged = await _repo.GetPagedAsync(request);

            var mapped = paged.Items.Select(m => new ModuleDto
            {
                ModuleId = m.Id,
                CourseId = m.CourseId,
                Title = m.Title,
                Description = m.Description,
                OrderIndex = m.OrderIndex,
                IsActive = m.IsActive,
                CourseName = m.Course.Title,
                CreatedOn = m.CreatedOn.ToString("dd MMM yyyy"),
            }).ToList();

            return new PagedResult<ModuleDto>(mapped, paged.TotalCount);
        }

        public async Task<ApiResponse<Guid>> CreateAsync(CreateModuleDto dto)
        {
            var module = new Module
            {
                Id = Guid.NewGuid(),
                CourseId = dto.CourseId,
                Title = dto.Title,
                Description = dto.Description,
                OrderIndex = dto.OrderIndex,
                IsActive = dto.IsActive,
                CreatedOn = DateTime.Now
            };

            await _repo.AddAsync(module);
            await _repo.SaveChangesAsync();

            return ApiResponse<Guid>.Ok(module.Id);
        }

        public async Task<ApiResponse<bool>> UpdateAsync(Guid id, CreateModuleDto dto)
        {
            var module = await _repo.GetByIdAsync(id);

            if (module == null)
                return ApiResponse<bool>.Fail("Module not found");

            module.Title = dto.Title;
            module.Description = dto.Description;
            module.OrderIndex = dto.OrderIndex;
            module.IsActive = dto.IsActive;
            module.CourseId = dto.CourseId;
            module.ModifiedOn = DateTime.UtcNow;

            _repo.Update(module);
            await _repo.SaveChangesAsync();

            return ApiResponse<bool>.Ok(true);
        }

        public async Task<ApiResponse<bool>> DeleteAsync(Guid id)
        {
            var module = await _repo.GetByIdAsync(id);

            if (module == null)
                return ApiResponse<bool>.Fail("Module not found");

            module.IsDeleted = true;
            module.ModifiedOn = DateTime.UtcNow;

            await _repo.SaveChangesAsync();

            return ApiResponse<bool>.Ok(true);
        }

        public async Task<ApiResponse<List<CourseDto>>> GetAllAsync()
        {
            var module = await _repo.GetAllAsync();

            var result = module.Select(c => new CourseDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                IsActive = c.IsActive
            }).ToList();

            return ApiResponse<List<CourseDto>>.Ok(result);
        }

        public async Task<List<ModuleDto>> GetModuleByCourseAsync(Guid courseId)
        {
            var modules = await _repo.GetModulesByCourseIdAsync(courseId);

            return modules.Select(m => new ModuleDto
            {
                ModuleId = m.Id,
                Title = m.Title,
                Description = m.Description,
                CourseId = m.CourseId
            }).ToList();
        }

    }
}
