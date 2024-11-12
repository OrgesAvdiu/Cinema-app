using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Cinema_app.Services
{
    public class CinemaService
    {
        private readonly CinemaDbContext _context;

        public CinemaService(CinemaDbContext context)
        {
            _context = context;
        }

        // Add a new cinema
        public void AddCinema(Cinema cinema)
        {
            _context.Cinemas.Add(cinema);
            _context.SaveChanges();
        }

        // Get all cinemas
        public List<Cinema> GetAllCinemas()
        {
            return _context.Cinemas.Include(c => c.Rooms).ToList();
        }

        // Get cinema by ID
        public Cinema GetCinemaById(int id)
        {
            return _context.Cinemas.Include(c => c.Rooms).FirstOrDefault(c => c.Id == id);
        }

        // Update a cinema
        public void UpdateCinema(Cinema updatedCinema)
        {
            var existingCinema = _context.Cinemas.FirstOrDefault(c => c.Id == updatedCinema.Id);
            if (existingCinema != null)
            {
                existingCinema.Name = updatedCinema.Name;
                existingCinema.Location = updatedCinema.Location;
                existingCinema.ContactInfo = updatedCinema.ContactInfo;
                existingCinema.Rooms = updatedCinema.Rooms;

                _context.SaveChanges();
            }
        }

        // Delete a cinema by ID
        public void DeleteCinema(int id)
        {
            var cinema = _context.Cinemas.FirstOrDefault(c => c.Id == id);
            if (cinema != null)
            {
                _context.Cinemas.Remove(cinema);
                _context.SaveChanges();
            }
        }

        // Search cinemas by name or location
        public List<Cinema> SearchCinemas(string searchTerm)
        {
            return _context.Cinemas
                           .Include(c => c.Rooms)
                           .Where(c => c.Name.Contains(searchTerm) || c.Location.Contains(searchTerm))
                           .ToList();
        }
    }
}
