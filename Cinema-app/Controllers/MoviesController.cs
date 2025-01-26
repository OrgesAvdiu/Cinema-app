using Cinema_app.model;
using Cinema_app.Services;
using CinemaApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MovieService _movieService;
        private readonly CinemaDbContext _context;

        public MovieController(MovieService movieService, CinemaDbContext context)
        {
            _movieService = movieService;
            _context = context;
        }

        // Add a new movie
        [HttpPost]
        [Consumes("multipart/form-data")]
        public IActionResult AddMovie([FromForm] Movie movie)
        {
            try
            {
                _movieService.Add(movie);
                return Ok(new { Message = "Movie added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while adding the movie", Error = ex.Message });
            }
        }
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Categories.Select(c => c.Name).ToListAsync();
            return Ok(categories);
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
public IActionResult UpdateMovie(int id, [FromForm] Movie updatedMovie)
{
    if (updatedMovie == null || id != updatedMovie.Id)
    {
        return BadRequest(new { Message = "Invalid movie data" });
    }

    try
    {
        var existingMovie = _movieService.GetById(id); // Ensure this method works correctly
        if (existingMovie == null)
        {
            return NotFound(new { Message = "Movie not found" });
        }

        _movieService.Update(id, updatedMovie); // Ensure this method updates the movie correctly
        return Ok(new { Message = "Movie updated successfully" });
    }
    catch (Exception ex)
    {
        // Log the exception (logging mechanism depends on your setup)
        // For example: _logger.LogError(ex, "Error updating movie with id {id}", id);

        return StatusCode(500, new { Message = "An error occurred while updating the movie", Details = ex.Message });
    }
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