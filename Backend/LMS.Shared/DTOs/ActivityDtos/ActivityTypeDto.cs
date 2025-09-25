namespace LMS.Shared.DTOs.ActivityDtos;

public class ActivityTypeDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<ActivityDto> Activities { get; set; } = [];
}
