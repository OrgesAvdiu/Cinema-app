using CinemaApp.Models;
using Cinema_app.model;
using Cinema_app.Services; // Namespace for your services and interfaces
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Cinema_app.Interface;

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

// Register services and their interfaces
builder.Services.AddScoped<IUserService, UserService>(); // Register User interface and service
builder.Services.AddScoped<IMovieService, MovieService>(); // Register Movie interface and service
builder.Services.AddScoped<ICategoryService, CategoryService>(); // Register Category interface and service
builder.Services.AddScoped<ICityService, CityService>(); //Register City interface and service
builder.Services.AddScoped<IOffersService, OffersService>(); // Register Offers interface and service

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
