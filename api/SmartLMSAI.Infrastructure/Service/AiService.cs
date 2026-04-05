using Microsoft.Extensions.Configuration;
using SmartLMSAI.Application.Interfaces.IServices;
using System.Text;
using System.Text.Json;

public class AiService(IConfiguration config, HttpClient httpClient) : IAiService
{
    private readonly string _apiKey = config["Groq:ApiKey"] ?? throw new Exception("Groq API Key missing");
    private readonly string _model;
    private readonly HttpClient _httpClient = httpClient;

    public async Task<string> AskAsync(string question, List<string> context)
    {
        var combinedContext = string.Join("\n\n",
            context.Where(x => !string.IsNullOrWhiteSpace(x)).Take(5));

        var prompt = $@"You are a helpful course assistant. Answer ONLY from the provided context.
                If answer is not found, say: 'Not available in course material'.
                Context: {combinedContext}
                Question: {question}";

        var requestBody = new
        {
            model = "llama-3.3-70b-versatile", // Free & very capable
            messages = new[]
            {
            new { role = "user", content = prompt }
        }
        };

        var json = JsonSerializer.Serialize(requestBody);
        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");

        var response = await _httpClient.PostAsync(
            "https://api.groq.com/openai/v1/chat/completions",
            new StringContent(json, Encoding.UTF8, "application/json")
        );

        var responseString = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            return $"Groq API Error: {response.StatusCode} - {responseString}";

        using var doc = JsonDocument.Parse(responseString);
        return doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? "No response generated.";
    }
}