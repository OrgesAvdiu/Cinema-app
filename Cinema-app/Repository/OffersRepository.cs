using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Repository
{
    public interface OffersRepository
    {
        void Add(Offers offer);
        List<Offers> GetAll();
        Offers GetById(int id);
        void Delete(int id);
        void Update(int id, Offers updatedOffer);
        List<Offers> Search(string searchTerm);
    }
}
