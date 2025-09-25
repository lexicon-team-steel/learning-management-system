using Domain.Models.Entities;

namespace Domain.Contracts.Repositories;

public interface ICourseRepository : IRepositoryBase<Course>
{
    public Task<Course?> GetCourseAsync(string userId);
    public Task<Course?> GetCourseWithModulesAsync(string userId);
    public Task<IEnumerable<ApplicationUser>?> GetCourseClassmatesAsync(string userId);

    public Task<List<Course>> GetUserCoursesAsync(string userId);
}
