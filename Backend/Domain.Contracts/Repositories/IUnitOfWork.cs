namespace Domain.Contracts.Repositories;

public interface IUnitOfWork
{
    public IUserRepository Students { get; }
    Task CompleteAsync();
}
