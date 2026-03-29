namespace SmartLMSAI.Application.Interfaces.IRepositories;

public interface IPdfTextExtractor
{
    Task<string> ExtractTextAsync(Stream pdfStream);
}
