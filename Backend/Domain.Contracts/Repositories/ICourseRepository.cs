using Domain.Models.Entities;

namespace Domain.Contracts.Repositories;

public interface ICourseRepository : IRepositoryBase<Course>
{
    public Task<List<Course>> GetCoursesAsync();
    public Task<List<Course>> GetUserCoursesAsync(string userId);
    public Task<Course?> GetUserCourseWithModulesAsync(string userId, Guid courseId);
    public Task<List<ApplicationUser>> GetUserCourseParticipantsAsync(string userId, Guid courseId, string? role);
    void CreateCourse(Course course);

}
