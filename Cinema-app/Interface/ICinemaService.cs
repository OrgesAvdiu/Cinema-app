using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Interface
{
    public interface ICinemaService
    {
        void AddCinema(Cinema cinema);
        List<Cinema> GetAllCinemas();
        Cinema GetCinemaById(int id);
        void UpdateCinema(int id, Cinema updatedCinema); // Signature updated to include id
        void DeleteCinema(int id);
        IEnumerable<Cinema> SearchCinemas(string searchTerm); // Return type updated to match implementation
    }
}
