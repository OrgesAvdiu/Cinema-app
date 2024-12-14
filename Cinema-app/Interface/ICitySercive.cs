using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Interface
{
    public interface ICityService
    {
        void AddCity(City city);
        List<City> GetAllCities();
        City GetCityById(int id);
        void DeleteCity(int id);
        void UpdateCity(int id, City updatedCity);
        List<City> SearchCities(string searchTerm);
    }
}