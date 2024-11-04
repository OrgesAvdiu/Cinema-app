
    using Cinema_app.model;
    // Repositories/MovieRepository.cs
    using CinemaApp.Models;
    using global::CinemaApp.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    namespace CinemaApp.Repository
    {
        public class MovieRepository
        {
            private readonly CinemaDbContext _context;

            public MovieRepository(CinemaDbContext context)
            {
                _context = context;
            }

            public async Task<List<Movie>> GetAllAsync()
            {
                return await _context.Movies.ToListAsync();
            }

            public async Task<Movie?> GetByIdAsync(long id)
            {
                return await _context.Movies.FindAsync(id);
            }

            public async Task AddAsync(Movie movie)
            {
                await _context.Movies.AddAsync(movie);
                await _context.SaveChangesAsync();
            }

            public async Task UpdateAsync(Movie movie)
            {
                _context.Movies.Update(movie);
                await _context.SaveChangesAsync();
            }

            public async Task DeleteAsync(long id)
            {
                var movie = await GetByIdAsync(id);
                if (movie != null)
                {
                    _context.Movies.Remove(movie);
                    await _context.SaveChangesAsync();
                }
            }
        }
    }

