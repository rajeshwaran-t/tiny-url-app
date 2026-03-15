using TinyUrl.Models;

namespace TinyUrl.Services.Interfaces
{
    public interface IUrlService
    {
        Task<Url> CreateShortUrl(string originalUrl, bool isPrivate);
        Task<List<Url>> GetAllUrls();
        Task<string> RedirectUrl(string code);
        Task DeleteUrl(int id);
    }
}
