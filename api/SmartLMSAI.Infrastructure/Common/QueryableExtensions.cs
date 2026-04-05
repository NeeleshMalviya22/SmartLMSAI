using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Common;
using System.Linq.Expressions;

namespace SmartLMSAI.Infrastructure.Common;

public static class QueryableExtensions
{
    public static IQueryable<T> ApplySearch<T>(this IQueryable<T> query, string? search, Expression<Func<T, string>> selector)
    {
        if (string.IsNullOrWhiteSpace(search))
            return query;

        var term = search.Trim();

        var parameter = selector.Parameters[0];
        var property = selector.Body;

        var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) })!;
        var searchExpression = Expression.Call(property, containsMethod, Expression.Constant(term));

        var lambda = Expression.Lambda<Func<T, bool>>(searchExpression, parameter);

        return query.Where(lambda);
    }

    public static IQueryable<T> ApplySorting<T>(
        this IQueryable<T> query,
        string? sortBy,
        string sortOrder)
    {
        if (string.IsNullOrEmpty(sortBy))
            return query;

        sortBy = sortBy.ToLower();

        return sortBy switch
        {
            "title" => sortOrder == "desc"
                ? query.OrderByDescending(e => EF.Property<object>(e!, "Title"))
                : query.OrderBy(e => EF.Property<object>(e!, "Title")),
            "isactive" => sortOrder == "desc"
                ? query.OrderByDescending(e => EF.Property<object>(e!, "IsActive"))
                : query.OrderBy(e => EF.Property<object>(e!, "IsActive")),
            _ => query
        };
    }

    public static async Task<PagedResult<T>> ApplyPagingAsync<T>(
        this IQueryable<T> query,
        int page,
        int pageSize)
    {
        var total = await query.CountAsync();

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<T>(items, total);
    }
}
