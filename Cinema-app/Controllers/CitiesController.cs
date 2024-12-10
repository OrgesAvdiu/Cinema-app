using Cinema_app.Interface;
using Cinema_app.model;
using Cinema_app.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Cinema_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly CityService _cityService;

        public CitiesController(CityService cityService)
        {
            _cityService = cityService;
        }

        // POST: api/cities
        [HttpPost]
        public IActionResult AddCity([FromBody] City city)
        {
            if (city == null)
            {
                return BadRequest(new { Message = "City cannot be null" });
            }

            _cityService.AddCity(city);
            return Ok(new { Message = "City added successfully" });
        }

        // GET: api/cities
        [HttpGet]
        public IActionResult GetAllCities()
        {
            var cities = _cityService.GetAllCities();
            return Ok(cities);
        }

        // GET: api/cities/{id}
        [HttpGet("{id}")]
        public IActionResult GetCityById(int id)
        {
            var city = _cityService.GetCityById(id);
            if (city == null)
            {
                return NotFound(new { Message = "City not found" });
            }
            return Ok(city);
        }

        // DELETE: api/cities/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteCity(int id)
        {
            var city = _cityService.GetCityById(id);
            if (city == null)
            {
                return NotFound(new { Message = "City not found" });
            }

            _cityService.DeleteCity(id);
            return Ok(new { Message = "City deleted successfully" });
        }

        // GET: api/cities/search
        [HttpGet("search")]
        public IActionResult SearchCities([FromQuery] string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
            {
                return BadRequest(new { Message = "Search term cannot be empty" });
            }

            var cities = _cityService.SearchCities(searchTerm);
            return Ok(cities);
        }
    }
}
