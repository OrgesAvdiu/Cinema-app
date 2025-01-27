using Cinema_app.model;
using CinemaApp.Models;
using System.Collections.Generic;

namespace Cinema_app.Repository
{
    public interface MovieDetailRepository
    {
        void Add(MovieDetail movieDetail);
        List<MovieDetail> GetAll();
        MovieDetail GetById(int movieDetailId);
        void DeleteById(int movieDetailId);
        void Update(int movieDetailId, MovieDetail updatedMovieDetail);
        List<MovieDetail> Search(string searchTerm);
    }
}