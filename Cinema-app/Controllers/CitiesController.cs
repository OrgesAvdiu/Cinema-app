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

        // Add a new city
        [HttpPost]
        public IActionResult AddCity([FromBody] City city)
        {
            _cityService.Add(city); // Adjusted to Add based on service method
            return Ok(new { Message = "City added successfully" });
        }

        // Get all cities
        [HttpGet]
        public IActionResult GetAllCities()
        {
            var cities = _cityService.GetAll(); // Adjusted to GetAll based on service method
            return Ok(cities);
        }

        // Get city by ID
        [HttpGet("{id}")]
        public IActionResult GetCityById(int id)
        {
            var city = _cityService.GetById(id); // Adjusted to GetById based on service method
            if (city == null)
            {
                return NotFound(new { Message = "City not found" });
            }
            return Ok(city);
        }

        // Update a city
        [HttpPut("{id}")]
        public IActionResult UpdateCity(int id, [FromBody] City updatedCity)
        {
            if (updatedCity == null || id != updatedCity.Id)
            {
                return BadRequest(new { Message = "Invalid city data" });
            }

            var existingCity = _cityService.GetById(id); // Adjusted to GetById based on service method
            if (existingCity == null)
            {
                return NotFound(new { Message = "City not found" });
            }

            _cityService.Update(id, updatedCity); // Adjusted to Update based on service method
            return Ok(new { Message = "City updated successfully" });
        }

        // Delete a city by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteCity(int id)
        {
            var city = _cityService.GetById(id); // Adjusted to GetById based on service method
            if (city == null)
            {
                return NotFound(new { Message = "City not found" });
            }
            _cityService.Delete(id); // Adjusted to Delete based on service method
            return Ok(new { Message = "City deleted successfully" });
        }

        // Search cities by name
        [HttpGet("search")]
        public IActionResult SearchCities([FromQuery] string searchTerm)
        {
            var cities = _cityService.Search(searchTerm); // Adjusted to Search based on service method
            return Ok(cities);
        }
    }
}
