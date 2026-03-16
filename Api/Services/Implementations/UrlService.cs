using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TinyUrl.Data;
using TinyUrl.Models;
using TinyUrl.Repositories.Interfaces;
using TinyUrl.Services.Interfaces;

namespace TinyUrl.Services.Implementations
{
    public class UrlService : IUrlService
    {
        private readonly IUrlRepository _repo;
        private readonly AppDbContext _context;

        public UrlService(IUrlRepository repo, AppDbContext context)
        {
            _repo = repo;
            _context = context;
        }

        public async Task<Url> CreateShortUrl(string originalUrl, bool isPrivate)
        {
            var code = GenerateCode();

            var url = new Url
            {
                OriginalUrl = originalUrl,
                ShortCode = code,
                IsPrivate = isPrivate,
                ClickCount = 0,
                CreatedDate = DateTime.UtcNow
            };

            return await _repo.CreateAsync(url);
        }

        public async Task<List<Url>> GetAllUrls()
        {
            return await _repo.GetAllAsync();
        }

        private string GenerateCode()
        {
            return Guid.NewGuid().ToString().Substring(0, 6);
        }

        public async Task<string> RedirectUrl(string code)
        {
            var url = await _repo.GetByCodeAsync(code);

            if (url == null)
                return null;

            url.ClickCount++;
            await _context.SaveChangesAsync();

            return url.OriginalUrl;
        }
        public async Task DeleteUrl(int id)
        {
            await _repo.DeleteAsync(id);
        }
    }
}
