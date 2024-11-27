using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Cinema_app.services
{
    public class OffersService
    {
        private readonly CinemaDbContext _context;

        public OffersService(CinemaDbContext context)
        {
            _context = context;
        }

        // Add new Offers
        public void AddOffers(Offers offers)
        {
            _context.Offers.Add(offers);
            _context.SaveChanges();
        }

        //Get all Offers
        public List<Offers> GetAllOffers()
        {
            return _context.Offers.Include(o => o.Cinema).ToList();
        }

        //Get offers by ID
        public Offers GetOffersById(int id)
        {
            return _context.Offers.Include(o => o.Cinema).FirstOrDeafault(o => o.Id == id);
        }

        // Update an Offer
        public void UpdateOffers(Offers updatedOffers)
        {
            var existingOffers = _context.Offers.FirstOrDeafault(o => o.Id == updatedOffers.Id);
            if(existingOffers != null)
            {
                existingOffers.Title = updatedOffers.Title;
                existingOffers.Description = updatedOffers.Description;
                existingOffers.Discount = updatedOffers.Discount;
                existingOffers.StartDate = updatedOffers.StartDate;
                existingOffers.EndDate = updatedOffers.EndDate;
                existingOffers.Cities = updatedOffers.Cities;

                _context.SaveChanges();
            }
        }

        // Delete an Offer by ID
        public void DeleteOffers(int id)
        {
            var offers = _context.Offers.FirstOrDefault(o => o.Id == id);
            if (offers != null)
            {
                _context.Offers.Remove(offers);
                _context.SaveChanges();
            }
        }

        // Search Offers by title or description
        public List<Offers> SearchOffers(string searchTerm)
        {
            return _context.Offers
                           .Include(o => o.Cinema)
                           .Where(o => o.Title.Contains(searchTerm) || o.Description.Contains(searchTerm))
                           .ToList();
        }
    }
}
