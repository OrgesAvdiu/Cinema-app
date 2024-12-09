﻿using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Services
{
    public interface IMovieService
    {
        void AddMovie(Movie movie);
        List<Movie> GetAllMovies();
        Movie GetMovieById(int movieId);
        void DeleteMovieById(int movieId);
        IEnumerable<string> GetMovieTitles();
        int GetMovieIdByTitle(string title);
    }
}
