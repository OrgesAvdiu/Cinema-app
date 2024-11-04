using Cinema_app.model;
using Microsoft.EntityFrameworkCore;

namespace CinemaApp.Models
{
    public class CinemaDbContext : DbContext
    {
        public CinemaDbContext(DbContextOptions<CinemaDbContext> options) : base(options) { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Offers> Offers { get; set; }
        public DbSet<City> Cities { get; set; }
    }
}
