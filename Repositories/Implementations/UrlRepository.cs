using Microsoft.EntityFrameworkCore;
using TinyUrl.Data;
using TinyUrl.Models;
using TinyUrl.Repositories.Interfaces;

namespace TinyUrl.Repositories.Implementations
{
    public class UrlRepository : IUrlRepository
    {
        private readonly AppDbContext _context;

        public UrlRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Url> CreateAsync(Url url)
        {
            _context.Urls.Add(url);
            await _context.SaveChangesAsync();
            return url;
        }

        public async Task<List<Url>> GetAllAsync()
        {
            try
            {
                return await _context.Urls.ToListAsync();
            }
            catch (Exception ex) {
                throw ex;
            }            
        }

        public async Task<Url> GetByCodeAsync(string code)
        {
            return await _context.Urls
                .FirstOrDefaultAsync(x => x.ShortCode == code);
        }

        public async Task DeleteAsync(int id)
        {
            var url = await _context.Urls.FindAsync(id);
            _context.Remove(url);
            await _context.SaveChangesAsync();
        }
    }
}
