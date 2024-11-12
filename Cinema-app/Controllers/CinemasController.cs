using Cinema_app.model;
using Cinema_app.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Cinema_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemasController : ControllerBase
    {
        private readonly CinemaService _cinemaService;

        public CinemasController(CinemaService cinemaService)
        {
            _cinemaService = cinemaService;
        }

        // Add a new cinema
        [HttpPost]
        public IActionResult AddCinema([FromBody] Cinema cinema)
        {
            _cinemaService.AddCinema(cinema);
            return Ok(new { Message = "Cinema added successfully" });
        }

        // Get all cinemas
        [HttpGet]
        public IActionResult GetAllCinemas()
        {
            var cinemas = _cinemaService.GetAllCinemas();
            return Ok(cinemas);
        }

        // Get cinema by ID
        [HttpGet("{id}")]
        public IActionResult GetCinemaById(int id)
        {
            var cinema = _cinemaService.GetCinemaById(id);
            if (cinema == null)
            {
                return NotFound(new { Message = "Cinema not found" });
            }
            return Ok(cinema);
        }

        // Update a cinema
        [HttpPut("{id}")]
        public IActionResult UpdateCinema(int id, [FromBody] Cinema cinema)
        {
            var existingCinema = _cinemaService.GetCinemaById(id);
            if (existingCinema == null)
            {
                return NotFound(new { Message = "Cinema not found" });
            }
            cinema.Id = id; // Ensure the correct ID is used
            _cinemaService.UpdateCinema(cinema);
            return Ok(new { Message = "Cinema updated successfully" });
        }

        // Delete a cinema by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteCinema(int id)
        {
            var cinema = _cinemaService.GetCinemaById(id);
            if (cinema == null)
            {
                return NotFound(new { Message = "Cinema not found" });
            }
            _cinemaService.DeleteCinema(id);
            return Ok(new { Message = "Cinema deleted successfully" });
        }

        // Search cinemas by name or location
        [HttpGet("search")]
        public IActionResult SearchCinemas([FromQuery] string searchTerm)
        {
            var cinemas = _cinemaService.SearchCinemas(searchTerm);
            return Ok(cinemas);
        }
    }
}
