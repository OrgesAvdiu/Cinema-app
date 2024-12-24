using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Cinema_app.Repository;
using Cinema_app.Services;

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
builder.Services.AddScoped<UserRepository, UserService>(); // Register User interface and service
builder.Services.AddScoped<MovieRepository, MovieService>(); // Register Movie interface and service
builder.Services.AddScoped<CategoryRepository, CategoryService>(); // Register Category interface and service
builder.Services.AddScoped<CityRepository, CityService>(); //Register City interface and services
builder.Services.AddScoped<OffersRepository, OffersService>(); //Register Offers interface and services
builder.Services.AddScoped<CinemaRepository, CinemaService>(); // Register Cinema interface and service
builder.Services.AddScoped<RoomRepository, RoomsService>(); // Register Rooms interface and service


// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:3000") // React app URL
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Enable CORS for the whole app
app.UseCors("AllowReactApp");

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
