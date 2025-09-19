using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using LMS.Infractructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infractructure.Repositories;

public class UserRepository(ApplicationDbContext context) : RepositoryBase<ApplicationUser>(context), IUserRepository
{
    public Task<ApplicationUser?> GetStudentWithCourseAsync(string studentId)
    {
        return FindByCondition(c => c.Id == studentId)
            .Include(c => c.Courses)
            .FirstOrDefaultAsync();
    }
}
