namespace SmartLMSAI.Domain.Entities;
public class Document : BaseEntity
{
    public Guid ModuleId { get; set; }

    public string FileName { get; set; } = null!;

    public string FilePath { get; set; } = null!;

    public long FileSize { get; set; }

    public string ContentType { get; set; } = null!;

    public string? ExtractedText { get; set; }

    public Module Module { get; set; } = null!;
}