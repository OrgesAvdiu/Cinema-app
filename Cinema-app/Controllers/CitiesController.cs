using Cinema_app.model;
using Cinema_app.services;
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
            _cityService.AddCity(city);
            return Ok(new { Message = "City added successfully" });
        }

        // Get all cities
        [HttpGet]
        public IActionResult GetAllCities()
        {
            var cities = _cityService.GetAllCities();
            return Ok(cities);
        }

        //Get city by ID
        [HttpGet("{id}")]
        public IActionResult GetCityById(int id)
        {
            var city = _cityService.GetCityById(id);
            if(city == null)
            {
                return NotFound(new { Message = "City not found" });
            }
            retunr Ok(city);
        }

        // Update a city
        [HttpPut("{id}")]
        public IActionResult UpdateCIty(int id, [FromBody] City city)
        {
            var existingCity = _cityService.GetCityById(id);
            if(existingCity == null)
            {
                retunr NotFound(new { Message = "City not found"});
            }
            city.Id = id;
            _cityService.UpdateCity(city);
            return Ok(new { Message = "City updated successfully" });
        }

        // Delete a city by ID
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

        // Search cities by name or state
        [HttpGet("search")]
        public IActionResult SearchCity([FromQuery] string searchTerm)
        {
            var cities = _cityService.SearchCity(searchTerm);
            return Ok(cities);
        }
    }
}