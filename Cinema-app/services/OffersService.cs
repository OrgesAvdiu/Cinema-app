using Cinema_app.model;
using CinemaApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Cinema_app.Services
{
    public class OffersService
    {
        private readonly CinemaDbContext _context;

        public OffersService(CinemaDbContext context)
        {
            _context = context;
        }

        // Add a new offer
        public void AddOffer(Offers offer)
        {
            _context.Offers.Add(offer);
            _context.SaveChanges();
        }

        // Get all offers
        public List<Offers> GetAllOffers()
        {
            return _context.Offers.Include(o => o.Cities).ToList();
        }

        // Get an offer by ID
        public Offers GetOfferById(int id)
        {
            return _context.Offers.Include(o => o.Cities).FirstOrDefault(o => o.Id == id);
        }

        // Delete an offer by ID
        public void DeleteOffer(int id)
        {
            var offer = _context.Offers.FirstOrDefault(o => o.Id == id);
            if (offer != null)
            {
                _context.Offers.Remove(offer);
                _context.SaveChanges();
            }
        }

        // Search offers by title or description
        public List<Offers> SearchOffers(string searchTerm)
        {
            return _context.Offers
                           .Where(o => o.Title.Contains(searchTerm) || o.Description.Contains(searchTerm))
                           .ToList();
        }
    }
}
