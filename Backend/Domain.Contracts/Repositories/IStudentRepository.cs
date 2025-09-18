using Domain.Models.Entities;

namespace Domain.Contracts.Repositories;

public interface IStudentRepository : IRepositoryBase<ApplicationUser>
{
    public Task<ApplicationUser?> GetStudentAsync(string studentId);
}