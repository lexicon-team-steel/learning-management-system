namespace Domain.Contracts.Repositories;

public interface IUnitOfWork
{
    public IUserRepository Users { get; }
    public ICourseRepository Courses { get; }
    public IModuleRepository Modules { get; }
    public IActivityRepository Activities { get; }
    public IActivityTypeRepository ActivityTypes { get; }
    Task CompleteAsync();
}
