using Cinema_app.model;
using Cinema_app.Repository;
using CinemaApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cinema_app.Services
{
    public class MovieDetailService : MovieDetailRepository
    {
        private readonly CinemaDbContext _context;

        public MovieDetailService(CinemaDbContext context)
        {
            _context = context;
        }

        // Add a new movie detail
        public void Add(MovieDetail movieDetail)
        {
            if (movieDetail == null)
                throw new ArgumentNullException(nameof(movieDetail));

            _context.MovieDetail.Add(movieDetail);
            _context.SaveChanges();
        }

        // Get all movie details
        public List<MovieDetail> GetAll()
        {
            return _context.MovieDetail.Include(md => md.Cinema).ToList();
        }

        // Get a movie detail by ID
        public MovieDetail GetById(int movieDetailId)
        {
            return _context.MovieDetail
                .Include(md => md.Cinema)
                .FirstOrDefault(md => md.Id == movieDetailId);
        }

        // Update a movie detail
        public void Update(int movieDetailId, MovieDetail movieDetail)
        {
            if (movieDetail == null)
                throw new ArgumentNullException(nameof(movieDetail));

            var existingMovieDetail = _context.MovieDetail.Include(md => md.Cinema).FirstOrDefault(md => md.Id == movieDetailId);
            if (existingMovieDetail == null)
            {
                throw new KeyNotFoundException($"MovieDetail with ID {movieDetailId} not found.");
            }

            // Update movie detail properties
            existingMovieDetail.Name = movieDetail.Name;
            existingMovieDetail.Description = movieDetail.Description;
            existingMovieDetail.Image = movieDetail.Image;
            existingMovieDetail.CinemaId = movieDetail.CinemaId;
            existingMovieDetail.NumberOfTickets = movieDetail.NumberOfTickets;
            existingMovieDetail.TotalPrice = movieDetail.TotalPrice;
            existingMovieDetail.PaymentMethod = movieDetail.PaymentMethod;
            existingMovieDetail.UpdatedDate = DateTime.UtcNow;

            _context.SaveChanges();
        }

        // Delete a movie detail
        public void DeleteById(int movieDetailId)
        {
            var movieDetail = _context.MovieDetail.FirstOrDefault(md => md.Id == movieDetailId);
            if (movieDetail != null)
            {
                _context.MovieDetail.Remove(movieDetail);
                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException($"MovieDetail with ID {movieDetailId} not found.");
            }
        }

        // Search for movie details
        public List<MovieDetail> Search(string searchTerm)
        {
            return _context.MovieDetail
                .Include(md => md.Cinema)
                .Where(md => md.Name.Contains(searchTerm) || md.Description.Contains(searchTerm))
                .ToList();
        }
    }
}