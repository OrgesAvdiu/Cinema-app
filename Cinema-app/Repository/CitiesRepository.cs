using Cinema_app.model;
using CinemaApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaApp.Repository
{
    public class CityRepository
    {
        private readonly CinemaDbContext _context;

        public CityRepository(CinemaDbContext context)
        {
            _context = context;
        }

        public async Task<List<City>> GetAllAsync()
        {
            return await _context.Cities.ToListAsync();
        }

        public async Task<City?> GetByIdAsync(long id)
        {
            return await _context.Cities.FindAsync(id);
        }

        public async Task AddAsync(City city)
        {
            await _context.Cities.AddAsync(city);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(City city)
        {
            _context.Cities.Update(city);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(long id)
        {
            var city = await GetByIdAsync(id);
            if (city != null)
            {
                _context.Cities.Remove(city);
                await _context.SaveChangesAsync();
            }
        }
    }
}
