using LMS.Shared.DTOs.CourseModuleDtos;
using LMS.Shared.DTOs.UserDtos;

namespace LMS.Shared.DTOs.CourseDtos;

public class CourseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public List<CourseModuleDto>? Modules { get; set; } = null;
    public List<UserDto>? Participants { get; set; } = null;
}
