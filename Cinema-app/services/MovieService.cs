using Cinema_app.model;
using CinemaApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Cinema_app.Services
{
    public class MovieService
    {
        private readonly CinemaDbContext _context;

        public MovieService(CinemaDbContext context)
        {
            _context = context;
        }

        // Add a new movie
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

        // Get all movies
        public List<Movie> GetAllMovies()
        {
            return _context.Movies.Include(m => m.Categories).ToList();
        }

        // Get a specific movie by Id
        public Movie GetMovieById(int movieId)
        {
            return _context.Movies
                .Include(m => m.Categories) // Ensure Categories are loaded with the movie
                .FirstOrDefault(m => m.Id == movieId);
        }

        // Delete a movie by Id
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

        // Get a list of all movie titles
        public IEnumerable<string> GetMovieTitles()
        {
            return _context.Movies.Select(m => m.Title).ToList();
        }

        // Get movie Id by title
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
