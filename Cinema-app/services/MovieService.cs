using Cinema_app.model;
using CinemaApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cinema_app.Services
{
    public class MovieService : IMovieService
    {
        private readonly CinemaDbContext _context;

        public MovieService(CinemaDbContext context)
        {
            _context = context;
        }

        public void AddMovie(Movie movie)
        {
            if (movie == null)
                throw new ArgumentNullException(nameof(movie));

            var newMovie = new Movie
            {
                Title = movie.Title,
                Description = movie.Description,
                Duration = movie.Duration,
                ReleaseDate = movie.ReleaseDate,
                Rating = movie.Rating,
                Language = movie.Language,
                Categories = movie.Categories
            };
            _context.Movies.Add(newMovie);
            _context.SaveChanges();
        }

        public List<Movie> GetAllMovies()
        {
            return _context.Movies.Include(m => m.Categories).ToList();
        }

        public Movie GetMovieById(int movieId)
        {
            return _context.Movies
                .Include(m => m.Categories)
                .FirstOrDefault(m => m.Id == movieId);
        }

        public void DeleteMovieById(int movieId)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.Id == movieId);
            if (movie != null)
            {
                _context.Movies.Remove(movie);
                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException($"Movie with ID {movieId} not found.");
            }
        }

        public IEnumerable<string> GetMovieTitles()
        {
            return _context.Movies.Select(m => m.Title).ToList();
        }

        public int GetMovieIdByTitle(string title)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.Title == title);
            if (movie != null)
            {
                return movie.Id;
            }
            else
            {
                throw new ArgumentException("Movie not found", nameof(title));
            }
        }
    }
}
