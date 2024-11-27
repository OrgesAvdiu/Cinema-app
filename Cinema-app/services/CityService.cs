using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Linq;

namespace Cinema_app.services
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
            _context.Cities.Add(city);
            _context.SaveChanges();
        }


        // Get all cities
        public List<City> GetAllCities()
        {
            return _context.Cities.Include(c => c.Cinemas).ToList();
        }

        // Get city by ID
        public City GetCityById(int id)
        {
            return _context.Cities.Include(c => c.Cinemas).FirstOrDeafault(c => c.Id == id);
        }


        // Update a city
        public void UpdateCity(City updatedCity)
        {
            var existingCity = _context.Cities.FirstOrDefault(c => c.Id == updatedCity.Id);
            if(existingCity != null)
            {
                existingCity.Name = updatedCity.Name;
                existingCity.Offers = updatedCity.Offers;

                _context.SaveChanges();
            }
        }


        // Delete a city by ID
        public void DeleteCity(int id)
        {
            var city = _context.Cities.FirstOrDefault(c => c.Id == id);
            if(city != null)
            {
                _context.Cities.Remove(city);
                _context.SaveChanges();
            }
        }

        // Search cities by name or state
        public List<City> SearchCity(string searchTerm)
        {
            return _context.Cities
                           .Include(c => c.Cinemas)
                           .Where(c => c.Name.Contains(searchTerm) || c.State.Contains(searchTerm))
                           .ToList();
                         
                           
        }
    }
}
