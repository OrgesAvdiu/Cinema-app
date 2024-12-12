using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Cinema_app.Interface;

namespace Cinema_app.Services
{
    public class CityService 
    {
        private readonly CinemaDbContext _context;

        public CityService(CinemaDbContext context)
        {
            _context = context;
        }

        public void AddCity(City city)
        {
            _context.Cities.Add(city);
            _context.SaveChanges();
        }

        public List<City> GetAllCities()
        {
            return _context.Cities.ToList();
        }

        public City GetCityById(int id)
        {
            return _context.Cities.FirstOrDefault(c => c.Id == id);
        }

        public void DeleteCity(int id)
        {
            var city = _context.Cities.FirstOrDefault(c => c.Id == id);
            if (city != null)
            {
                _context.Cities.Remove(city);
                _context.SaveChanges();
            }
        }

        public void UpdateCity(int id, City updatedCity)
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

        public List<City> SearchCities(string searchTerm)
        {
            return _context.Cities
                           .Where(c => c.Name.Contains(searchTerm))
                           .ToList();
        }
    }
}
