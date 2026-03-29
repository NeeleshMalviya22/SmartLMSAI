namespace SmartLMSAI.Domain.Entities;

public class ModuleProgress : BaseEntity
{
    public Guid ModuleId { get; set; }
    public Guid LearnerId { get; set; }
    public string Status { get; set; } = "NOT_STARTED"; // NOT_STARTED, IN_PROGRESS, COMPLETED
    public DateTime? CompletedOn { get; set; }
    public Module Module { get; set; } = null!;
}
