namespace Domain.Models.Entities;

public class Activity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public Guid ActivityTypeId { get; set; }
    public ActivityType ActivityType { get; set; } = null!;
    public Guid CourseModuleId { get; set; }
    public CourseModule CourseModule { get; set; } = null!;
}