
namespace SmartLMSAI.Domain.Entities
{
    public class Module: BaseEntity
    {
        public Guid CourseId { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public int OrderIndex { get; set; }
        public bool IsActive { get; set; } = true;
        public Course Course { get; set; } = default!;
    }
}
