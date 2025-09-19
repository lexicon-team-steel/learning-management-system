using Domain.Models.Entities;

namespace Domain.Contracts.Repositories;

public interface IUserRepository : IRepositoryBase<ApplicationUser>
{
    public Task<ApplicationUser?> GetStudentWithCourseAsync(string studentId);
}
