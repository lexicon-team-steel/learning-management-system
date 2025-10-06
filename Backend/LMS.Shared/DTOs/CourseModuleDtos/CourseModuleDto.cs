using LMS.Shared.DTOs.ActivityDtos;

namespace LMS.Shared.DTOs.CourseModuleDtos;

public class CourseModuleDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string CourseName { get; set; } = string.Empty;
    public List<ActivityDto> Activities { get; set; } = [];
}
