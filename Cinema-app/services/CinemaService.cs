using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Cinema_app.Repository;

namespace Cinema_app.Services
{
    public class CinemaService : CinemaRepository
    {
        private readonly CinemaDbContext _context;

        public CinemaService(CinemaDbContext context)
        {
            _context = context;
        }

        public void Add(Cinema cinema)
        {
            _context.Cinemas.Add(cinema);
            _context.SaveChanges();
        }

        public List<Cinema> GetAll()
        {
            return _context.Cinemas.Include(c => c.Rooms).ToList();
        }

        public Cinema GetById(int id)
        {
            return _context.Cinemas.Include(c => c.Rooms).FirstOrDefault(c => c.Id == id);
        }

        public void Update(int id, Cinema updatedCinema)
        {
            var existingCinema = _context.Cinemas.FirstOrDefault(c => c.Id == id);
            if (existingCinema != null)
            {
                existingCinema.Name = updatedCinema.Name;
                existingCinema.Location = updatedCinema.Location;
                existingCinema.ContactInfo = updatedCinema.ContactInfo;
                existingCinema.Rooms = updatedCinema.Rooms;

                _context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            var cinema = _context.Cinemas.FirstOrDefault(c => c.Id == id);
            if (cinema != null)
            {
                _context.Cinemas.Remove(cinema);
                _context.SaveChanges();
            }
        }

        public IEnumerable<Cinema> Search(string searchTerm)
        {
            return _context.Cinemas
                           .Include(c => c.Rooms)
                           .Where(c => c.Name.Contains(searchTerm) || c.Location.Contains(searchTerm));
        }
    }
}
