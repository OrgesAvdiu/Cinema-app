using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Interface
{
    public interface ICity
    {
        void AddCity(City city);
        List<City> GetAllCitites();
        City GetCityById(int id);
        void DeleteCity(int id);
        void UpdateCity(int id, City updatedCity);
        List<City> SearchCitites(string searchTerm);
    }
}