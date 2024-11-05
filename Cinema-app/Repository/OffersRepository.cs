using Cinema_app.model;
using CinemaApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaApp.Repository
{
    public class OfferRepository
    {
        private readonly CinemaDbContext _context;

        public OfferRepository(CinemaDbContext context)
        {
            _context = context;
        }

        public async Task<List<Offers>> GetAllAsync()
        {
            return await _context.Offers.ToListAsync();
        }

        public async Task<Offers?> GetByIdAsync(long id)
        {
            return await _context.Offers.FindAsync(id);
        }

        public async Task AddAsync(Offers offer)
        {
            await _context.Offers.AddAsync(offer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Offers offer)
        {
            _context.Offers.Update(offer);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(long id)
        {
            var offer = await GetByIdAsync(id);
            if (offer != null)
            {
                _context.Offers.Remove(offer);
                await _context.SaveChangesAsync();
            }
        }
    }
}