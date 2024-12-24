using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Cinema_app.Repository;

namespace Cinema_app.Services
{
    public class CityService : CityRepository
    {
        private readonly CinemaDbContext _context;

        public CityService(CinemaDbContext context)
        {
            _context = context;
        }

        // Add a new city
        public void Add(City city)
        {
            _context.Cities.Add(city);
            _context.SaveChanges();
        }

        // Get all cities
        public List<City> GetAll()
        {
            return _context.Cities.ToList();
        }

        // Get a city by ID
        public City GetById(int id)
        {
            return _context.Cities.FirstOrDefault(c => c.Id == id);
        }

        // Update a city
        public void Update(int id, City updatedCity)
        {
            var city = _context.Cities.FirstOrDefault(c => c.Id == id);
            if (city == null)
            {
                throw new KeyNotFoundException($"City with ID {id} not found.");
            }

            // Update the fields
            city.Name = updatedCity.Name ?? city.Name;
            city.Offers = updatedCity.Offers ?? city.Offers;

            // Save the changes to the database
            _context.SaveChanges();
        }

        // Delete a city by ID
        public void Delete(int id)
        {
            var city = _context.Cities.FirstOrDefault(c => c.Id == id);
            if (city != null)
            {
                _context.Cities.Remove(city);
                _context.SaveChanges();
            }
        }

        // Search for cities based on the name
        public List<City> Search(string searchTerm)
        {
            return _context.Cities
                           .Where(c => c.Name.Contains(searchTerm))
                           .ToList();
        }
    }
}
