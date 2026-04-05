namespace SmartLMSAI.Application.Common;

public class PagedRequest
{
    public string? Search { get; set; }
    public int Page { get; set; } = 1;

    private int _pageSize = 10;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > 50 ? 50 : value;
    }

    public string? SortBy { get; set; }
    public string SortOrder { get; set; } = "asc";
}
