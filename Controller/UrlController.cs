using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TinyUrl.Dtos;
using TinyUrl.Services.Interfaces;

namespace TinyUrl.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlController : ControllerBase
    {
        private readonly IUrlService _service;

        public UrlController(IUrlService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create(UrlRequestDto request)
        {
            var result = await _service.CreateShortUrl(
                request.OriginalUrl,
                request.IsPrivate
            );

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllUrls());
        }

        [HttpGet("/r/{code}")]
        public async Task<IActionResult> RedirectUrl(string code)
        {
            var url = await _service.RedirectUrl(code);

            return Redirect(url);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteUrl(id);
            return Ok("URL deleted successfully");
        }
    }
}
