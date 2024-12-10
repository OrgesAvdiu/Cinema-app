using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Cinema_app.Interface;  // If you have an interface for CityService, you can include it

namespace Cinema_app.Services
{
    public class CityService
    {
        private readonly CinemaDbContext _context;

        public CityService(CinemaDbContext context)
        {
            _context = context;
        }

        // Add a new city
        public void AddCity(City city)
        {
            if (city == null)
            {
                throw new ArgumentNullException(nameof(city));
            }

            _context.Cities.Add(city);
            _context.SaveChanges();
        }

        // Get all cities
        public List<City> GetAllCities()
        {
            return _context.Cities.ToList();
        }

        // Get city by ID
        public City GetCityById(int id)
        {
            return _context.Cities.FirstOrDefault(c => c.Id == id);
        }

        // Update city
        public void UpdateCity(City updatedCity)
        {
            if (updatedCity == null)
            {
                throw new ArgumentNullException(nameof(updatedCity));
            }

            var existingCity = _context.Cities.FirstOrDefault(c => c.Id == updatedCity.Id);
            if (existingCity != null)
            {
                existingCity.Name = updatedCity.Name;
                existingCity.Offers = updatedCity.Offers;

                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException($"City with ID {updatedCity.Id} not found.");
            }
        }

        // Delete a city by ID
        public void DeleteCity(int id)
        {
            var city = _context.Cities.FirstOrDefault(c => c.Id == id);
            if (city != null)
            {
                _context.Cities.Remove(city);
                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException($"City with ID {id} not found.");
            }
        }

        // Search cities by name
        public List<City> SearchCities(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                throw new ArgumentException("Search term cannot be empty.", nameof(searchTerm));
            }

            return _context.Cities
                           .Where(c => c.Name.Contains(searchTerm))
                           .ToList();
        }
    }
}
