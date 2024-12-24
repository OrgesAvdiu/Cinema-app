using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Repository
{
    public interface CityRepository
    {
        void Add(City city);
        List<City> GetAll();
        City GetById(int id);
        void Delete(int id);
        void Update(int id, City updatedCity);
        List<City> Search(string searchTerm);
    }
}
