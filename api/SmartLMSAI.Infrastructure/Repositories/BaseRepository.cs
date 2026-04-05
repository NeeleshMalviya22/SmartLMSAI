using Microsoft.EntityFrameworkCore;
using SmartLMSAI.Application.Interfaces.IRepositories;

namespace SmartLMSAI.Infrastructure.Repositories;

public class BaseRepository<T> : IBaseRepository<T> where T : class
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public BaseRepository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task AddAsync(T entity)
        => await _dbSet.AddAsync(entity);

    public async Task<T?> GetByIdAsync(Guid id)
        => await _dbSet.FindAsync(id);

    public async Task<List<T>> GetAllAsync()
        => await _dbSet.ToListAsync();

    public void Update(T entity)
        => _dbSet.Update(entity);

    public void Delete(T entity)
        => _dbSet.Remove(entity);

    public async Task SaveChangesAsync()
        => await _context.SaveChangesAsync();
}
