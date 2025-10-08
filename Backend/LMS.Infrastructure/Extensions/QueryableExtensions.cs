using LMS.Shared.Common;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Extensions;

public static class QueryableExtensions
{
    public static IQueryable<T> WithOffset<T>(
        this IQueryable<T> query,
        int pageSize, int pageIndex) =>
        query.Skip((pageIndex - 1) * pageSize).Take(pageSize);

    public static async Task<PagedResult<T>> ToPagedResultAsync<T>(
        this IQueryable<T> query,
        int pageSize,
        int pageIndex)
    {
        return new PagedResult<T>(
            items: await query.WithOffset(pageSize, pageIndex).ToListAsync(),
            pageIndex: pageIndex,
            pageSize: pageSize,
            totalCount: await query.CountAsync()
        );
    }
}
