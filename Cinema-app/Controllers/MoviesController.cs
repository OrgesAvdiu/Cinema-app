using Cinema_app.model;
using Cinema_app.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Cinema_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MovieService _movieService;

        public MovieController(MovieService movieService)
        {
            _movieService = movieService;
        }

        // Add a new movie
        [HttpPost]
        public IActionResult AddMovie([FromBody] Movie movie)
        {
            _movieService.AddMovie(movie);
            return Ok(new { Message = "Movie added successfully" });
        }

        // Get all movies
        [HttpGet]
        public IActionResult GetAllMovies()
        {
            var movies = _movieService.GetAllMovies();
            return Ok(movies);
        }

        // Get movie by ID
        [HttpGet("{id}")]
        public IActionResult GetMovieById(int id)
        {
            var movie = _movieService.GetMovieById(id);
            if (movie == null)
            {
                return NotFound(new { Message = "Movie not found" });
            }
            return Ok(movie);
        }

        // Delete a movie by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(int id)
        {
            _movieService.DeleteMovieById(id);
            return Ok(new { Message = "Movie deleted successfully" });
        }

        // Search movies by title
        //[HttpGet("search")]
        //public IActionResult SearchMovies([FromQuery] string searchTerm)
        //{
            //var movies = _movieService.Sear(searchTerm);
          //  return Ok(movies);
        //}
    }
}
