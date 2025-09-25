namespace Domain.Models.Entities;

public class CourseModule
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public Guid CourseId { get; set; }

    public Course Course { get; set; } = null!;
    public ICollection<Activity> Activities { get; set; } = [];
}
