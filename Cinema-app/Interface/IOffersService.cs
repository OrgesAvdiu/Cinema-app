using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Interface
{
    public interface IOffersService
    {
        void AddOffer(Offers offer);
        List<Offers> GetAllOffers();
        Offers GetOfferById(int id);
        void DeleteOffer(int id);
        void UpdateOffer(int id, Offers updatedOffer);
        List<Offers> SearchOffers(string searchTerm);
    }
}
