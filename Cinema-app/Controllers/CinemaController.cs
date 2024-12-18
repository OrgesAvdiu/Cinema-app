using Cinema_app.model;
using Cinema_app.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Cinema_app.Interface;

namespace Cinema_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemaController : ControllerBase
    {
        private readonly ICinemaService _cinemaService;

        public CinemaController(ICinemaService cinemaService)
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
            if (cinema == null || id != cinema.Id)
            {
                return BadRequest(new { Message = "Invalid cinema data" });
            }

            var existingCinema = _cinemaService.GetCinemaById(id);
            if (existingCinema == null)
            {
                return NotFound(new { Message = "Cinema not found" });
            }

            _cinemaService.UpdateCinema(id, cinema); // Pass both id and cinema
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
