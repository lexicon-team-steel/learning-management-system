using AutoMapper;
using LMS.Shared.Common;

namespace LMS.Services.Extensions;

public static class PagedResultExtensions
{
    public static PagedResult<TDest> Map<TSrc, TDest>(this PagedResult<TSrc> source, IMapper mapper) =>
        new(
            items: mapper.Map<IEnumerable<TDest>>(source.Items),
            details: source.Details
        );
}
