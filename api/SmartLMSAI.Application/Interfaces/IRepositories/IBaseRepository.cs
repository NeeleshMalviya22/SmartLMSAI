namespace SmartLMSAI.Application.Interfaces.IRepositories;

public interface IBaseRepository<T> where T : class
{
    Task AddAsync(T entity);
    Task<T?> GetByIdAsync(Guid id);
    Task<List<T>> GetAllAsync();
    void Update(T entity);
    void Delete(T entity);
    Task SaveChangesAsync();
}
