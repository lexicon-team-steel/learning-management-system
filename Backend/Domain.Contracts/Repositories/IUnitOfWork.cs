namespace Domain.Contracts.Repositories;

public interface IUnitOfWork
{
    public IUserRepository Students { get; }
    public ICourseRepository Courses { get; }
    Task CompleteAsync();
}
