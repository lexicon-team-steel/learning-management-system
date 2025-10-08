namespace LMS.Shared.Parameters;

public class UserQueryParameters : PageParameters
{
    public string? Name { get; set; }
    public string? Role { get; set; }
    public Guid? CourseId { get; set; }
    public Guid? NotCourseId { get; set; }
    public bool? AvailableForCourse { get; set; }
}
