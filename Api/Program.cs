using Microsoft.EntityFrameworkCore;
using TinyUrl.Data;
using TinyUrl.Repositories.Implementations;
using TinyUrl.Repositories.Interfaces;
using TinyUrl.Services.Implementations;
using TinyUrl.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers(); // IMPORTANT

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseSqlServer("Server=DESKTOP-H0R1JE7\\SQLEXPRESS;Database=UrlManagementDB;Trusted_Connection=True;TrustServerCertificate=True;"));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Dependency Injection
builder.Services.AddScoped<IUrlRepository, UrlRepository>();
builder.Services.AddScoped<IUrlService, UrlService>();

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:3000",
                "https://calm-smoke-09290d00f.4.azurestaticapps.net"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var app = builder.Build();

// Enable CORS
app.UseCors("ReactPolicy");

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers(); // IMPORTANT

// ADD THIS LINE
app.MapGet("/", () => "TinyUrl API is running successfully");

app.Run();