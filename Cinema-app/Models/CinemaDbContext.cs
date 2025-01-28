using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Cinema_app.model;

namespace CinemaApp.Models
{
    public class CinemaDbContext : IdentityDbContext<User>
    {
        public CinemaDbContext(DbContextOptions<CinemaDbContext> options)
            : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Offers> Offers { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<MovieDetail> MovieDetail { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the many-to-many relationship between Movie and Category
            modelBuilder.Entity<Movie>()
                .HasMany(m => m.Categories)
                .WithMany(c => c.Movies)
                .UsingEntity(j => j.ToTable("MovieCategory")); // Specify join table name

            // Add any additional configurations if needed
        }
    }
}