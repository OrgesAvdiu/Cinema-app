using Cinema_app.model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Cinema_app.Services;

namespace Cinema_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemaController : ControllerBase
    {
        private readonly CinemaService _cinemaService;

        public CinemaController(CinemaService cinemaService)
        {
            _cinemaService = cinemaService;
        }

        // Add a new cinema
        [HttpPost]
        public IActionResult AddCinema([FromBody] Cinema cinema)
        {
            _cinemaService.Add(cinema); // Adjusted to Add based on service method
            return Ok(new { Message = "Cinema added successfully" });
        }

        // Get all cinemas
        [HttpGet]
        public IActionResult GetAllCinemas()
        {
            var cinemas = _cinemaService.GetAll(); // Adjusted to GetAll based on service method
            return Ok(cinemas);
        }

        // Get cinema by ID
        [HttpGet("{id}")]
        public IActionResult GetCinemaById(int id)
        {
            var cinema = _cinemaService.GetById(id); // Adjusted to GetById based on service method
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

            var existingCinema = _cinemaService.GetById(id); // Adjusted to GetById based on service method
            if (existingCinema == null)
            {
                return NotFound(new { Message = "Cinema not found" });
            }

            _cinemaService.Update(id, cinema); // Adjusted to Update based on service method
            return Ok(new { Message = "Cinema updated successfully" });
        }

        // Delete a cinema by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteCinema(int id)
        {
            var cinema = _cinemaService.GetById(id); // Adjusted to GetById based on service method
            if (cinema == null)
            {
                return NotFound(new { Message = "Cinema not found" });
            }
            _cinemaService.Delete(id); // Adjusted to Delete based on service method
            return Ok(new { Message = "Cinema deleted successfully" });
        }

        // Search cinemas by name or location
        [HttpGet("search")]
        public IActionResult SearchCinemas([FromQuery] string searchTerm)
        {
            var cinemas = _cinemaService.Search(searchTerm); // Adjusted to Search based on service method
            return Ok(cinemas);
        }
    }
}
