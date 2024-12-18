using Cinema_app.Interface;
using Cinema_app.model;
using Cinema_app.Interface;
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

        [HttpPost]
        public IActionResult AddCity([FromBody] City city)
        {
            _cityService.AddCity(city);
            return Ok(new { Message = "City added successfully" });
        }

        [HttpGet]
        public IActionResult GetAllCities()
        {
            var cities = _cityService.GetAllCities();
            return Ok(cities);
        }

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

        [HttpDelete("{id}")]
        public IActionResult DeleteCity(int id)
        {
            _cityService.DeleteCity(id);
            return Ok(new { Message = "City deleted successfully" });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCity(int id, [FromBody] City updatedCity)
        {
            if (updatedCity == null)
            {
                return BadRequest(new { Message = "City data is required" });
            }

            try
            {
                // Pass data to service to update city by ID
                _cityService.UpdateCity(id, updatedCity);

                return Ok(new { Message = "City updated successfully" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = "An error occurred while updating the city",
                    Error = ex.Message
                });
            }
        }

        [HttpGet("search")]
        public IActionResult SearchCities([FromQuery] string searchTerm)
        {
            var cities = _cityService.SearchCities(searchTerm);
            return Ok(cities);
        }
    }
}
