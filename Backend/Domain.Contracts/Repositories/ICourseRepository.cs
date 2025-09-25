using Domain.Models.Entities;

namespace Domain.Contracts.Repositories;

public interface ICourseRepository : IRepositoryBase<Course>
{
    public Task<Course?> GetCourseAsync(string userId);
    public Task<Course?> GetCourseWithModulesAsync(string userId);
    public Task<IEnumerable<ApplicationUser>?> GetCourseClassmatesAsync(string userId);

    public Task<List<Course>> GetUserCoursesAsync(string userId);
    public Task<Course?> GetUserCourseWithModulesAsync(string userId, Guid courseId);
    public Task<List<ApplicationUser>> GetUserCourseParticipantsAsync(string userId, Guid courseId);

    public Task<Course?> GetCourseByIdAsync(Guid id);
    public Task<bool> UserHasAccessToCourse(string userId, Guid courseId);
}
