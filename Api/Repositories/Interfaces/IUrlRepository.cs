using TinyUrl.Models;

namespace TinyUrl.Repositories.Interfaces
{
    public interface IUrlRepository
    {
        Task<Url> CreateAsync(Url url);
        Task<List<Url>> GetAllAsync();
        Task<Url> GetByCodeAsync(string code);
        Task DeleteAsync(int id);
    }
}
