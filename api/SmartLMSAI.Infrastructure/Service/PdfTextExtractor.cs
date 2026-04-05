using iText.Kernel.Pdf;
using SmartLMSAI.Application.Interfaces.IRepositories;
using System.Text;

namespace SmartLMSAI.Infrastructure.Service;

public class PdfTextExtractorService : IPdfTextExtractor
{
    public Task<string> ExtractTextAsync(Stream pdfStream)
    {
        var sb = new StringBuilder();

        using var reader = new PdfReader(pdfStream);
        using var pdfDoc = new PdfDocument(reader);

        for (int i = 1; i <= pdfDoc.GetNumberOfPages(); i++)
        {
            var page = pdfDoc.GetPage(i);
            var text = iText.Kernel.Pdf.Canvas.Parser.PdfTextExtractor.GetTextFromPage(page);
            if (!string.IsNullOrWhiteSpace(text))
                sb.AppendLine(text);
        }

        return Task.FromResult(sb.ToString().Trim());
    }
}
