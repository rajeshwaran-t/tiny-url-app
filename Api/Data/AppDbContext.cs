using Microsoft.EntityFrameworkCore;
using TinyUrl.Models;

namespace TinyUrl.Data
{    
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Url> Urls { get; set; }
    }
}
