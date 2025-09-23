namespace Domain.Models.Entities;

public class Activity
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    // TODO: Add ActivityType entity and relation to Activity

    public Guid ModuleId { get; set; }
    public CourseModule CourseModule { get; set; } = null!;
}