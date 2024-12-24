using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Repository
{
    public interface CinemaRepository
    {
        void Add(Cinema cinema);
        List<Cinema> GetAll();
        Cinema GetById(int id);
        void Update(int id, Cinema updatedCinema);
        void Delete(int id);
        IEnumerable<Cinema> Search(string searchTerm);
    }
}
