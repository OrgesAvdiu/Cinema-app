using Cinema_app.model;
using Cinema_app.Services;
using Microsoft.AspNetCore.Mvc;

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
            _movieService.Add(movie); // Adjusted to Add based on service method
            return Ok(new { Message = "Movie added successfully" });
        }




        // Get all movies
        [HttpGet]
        public IActionResult GetAllMovies()
        {
            var movies = _movieService.GetAll(); // Adjusted to GetAll based on service method
            return Ok(movies);
        }

        // Get movie by ID
        [HttpGet("{id}")]
        public IActionResult GetMovieById(int id)
        {
            var movie = _movieService.GetById(id); // Adjusted to GetById based on service method
            if (movie == null)
            {
                return NotFound(new { Message = "Movie not found" });
            }
            return Ok(movie);
        }

        // Update a movie
        [HttpPut("{id}")]
        public IActionResult UpdateMovie(int id, [FromBody] Movie updatedMovie)
        {
            if (updatedMovie == null || id != updatedMovie.Id)
            {
                return BadRequest(new { Message = "Invalid movie data" });
            }

            var existingMovie = _movieService.GetById(id); // Adjusted to GetById based on service method
            if (existingMovie == null)
            {
                return NotFound(new { Message = "Movie not found" });
            }

            _movieService.Update(id, updatedMovie); // Adjusted to Update based on service method
            return Ok(new { Message = "Movie updated successfully" });
        }

        // Delete a movie by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(int id)
        {
            var movie = _movieService.GetById(id); // Adjusted to GetById based on service method
            if (movie == null)
            {
                return NotFound(new { Message = "Movie not found" });
            }
            _movieService.DeleteById(id); // Adjusted to Delete based on service method
            return Ok(new { Message = "Movie deleted successfully" });
        }
    }
}
