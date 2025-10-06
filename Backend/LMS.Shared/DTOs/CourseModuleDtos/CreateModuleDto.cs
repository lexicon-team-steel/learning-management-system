using System.ComponentModel.DataAnnotations;

public class CreateModuleDto
{
    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, ErrorMessage = "Name cannot be longer than 100 characters")]
    public string Name { get; set; } = string.Empty;
    [Required(ErrorMessage = "Description is required")]
    [StringLength(1000, ErrorMessage = "Description cannot be longer than 1000 characters")]
    public string Description { get; set; } = string.Empty;
    [Required(ErrorMessage = "StartDate is required")]
    public DateTime StartDate { get; set; }
    [Required(ErrorMessage = "EndDate is required")]
    public DateTime EndDate { get; set; }
}
