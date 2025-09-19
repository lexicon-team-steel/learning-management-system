namespace Domain.Contracts.Repositories;

public interface IUnitOfWork
{
    public IStudentRepository Students { get; }
    Task CompleteAsync();
}
