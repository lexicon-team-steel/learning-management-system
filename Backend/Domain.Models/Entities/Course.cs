namespace Domain.Models.Entities;

public class Course
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public ICollection<ApplicationUser> Users { get; set; } = [];
    public ICollection<CourseModule> Modules { get; set; } = [];
}
