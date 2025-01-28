using Cinema_app.model;
using CinemaApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Cinema_app.Repository;

namespace Cinema_app.Services
{
    public class MovieService : MovieRepository
    {
        private readonly CinemaDbContext _context;

        public MovieService(CinemaDbContext context)
        {
            _context = context;
        }

        // Add a new movie
        public void Add(Movie movie)
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
                Categories = movie.Categories,
                imageUrl = movie.imageUrl,
                Price = movie.Price  // Ensure this line is present
            };
            _context.Movies.Add(newMovie);
            _context.SaveChanges();
        }

        // Get all movies
        public List<Movie> GetAll()
        {
            return _context.Movies.Include(m => m.Categories).ToList();
        }

        // Get a movie by ID
        public Movie GetById(int movieId)
        {
            return _context.Movies
                .Include(m => m.Categories)
                .FirstOrDefault(m => m.Id == movieId);
        }

        // Update a movie
        public void Update(int movieId, Movie movie)
        {
            if (movie == null)
                throw new ArgumentNullException(nameof(movie));

            var existingMovie = _context.Movies.Include(m => m.Categories).FirstOrDefault(m => m.Id == movieId);
            if (existingMovie == null)
            {
                throw new KeyNotFoundException($"Movie with ID {movieId} not found.");
            }

            // Update movie properties
            existingMovie.Title = movie.Title;
            existingMovie.Description = movie.Description;
            existingMovie.Duration = movie.Duration;
            existingMovie.ReleaseDate = movie.ReleaseDate;
            existingMovie.Rating = movie.Rating;
            existingMovie.Language = movie.Language;
            existingMovie.imageUrl = movie.imageUrl;
            existingMovie.Price = movie.Price;  // Ensure this line is present

            // Update categories
            existingMovie.Categories.Clear();
            foreach (var category in movie.Categories)
            {
                existingMovie.Categories.Add(category);
            }

            _context.SaveChanges();
        }

        // Delete a movie
        public void DeleteById(int movieId)
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

        // Get movie titles
        public IEnumerable<string> GetTitles()
        {
            return _context.Movies.Select(m => m.Title).ToList();
        }

        // Get movie ID by title
        public int GetIdByTitle(string title)
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