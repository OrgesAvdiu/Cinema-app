using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Repository
{
    public interface MovieRepository
    {
        void Add(Movie movie);
        List<Movie> GetAll();
        Movie GetById(int movieId);
        void DeleteById(int movieId);
        IEnumerable<string> GetTitles();
        int GetIdByTitle(string title);
        void Update(int movieId, Movie movie);
    }
}