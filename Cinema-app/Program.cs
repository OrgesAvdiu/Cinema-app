using CinemaApp.Models;
using Cinema_app.model;
using Cinema_app.Services;  // Make sure to include the namespace for your services
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Cinema API", Version = "v1" });
});

// Add DbContext with SQL Server configuration
builder.Services.AddDbContext<CinemaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseConnection")));

// Register Identity services
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<CinemaDbContext>()
    .AddDefaultTokenProviders();

// Register custom services
builder.Services.AddScoped<UserService>(); // Register UserService
builder.Services.AddScoped<MovieService>(); // Register MovieService
builder.Services.AddScoped<CategoryService>(); // Register CategoryService

// Add other services here if needed, e.g., builder.Services.AddScoped<OtherService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cinema API V1");
        c.RoutePrefix = "swagger"; // Set this if you want to access at /swagger
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
