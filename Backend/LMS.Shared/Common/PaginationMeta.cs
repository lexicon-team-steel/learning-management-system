namespace LMS.Shared.Common;

public class PaginationMeta
{
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages => TotalCount is 0
        ? 0 : (int)Math.Ceiling((double)TotalCount / PageSize);
}