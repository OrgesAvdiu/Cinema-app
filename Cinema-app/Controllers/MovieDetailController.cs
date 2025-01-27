using Cinema_app.model;
using Cinema_app.Services;
using CinemaApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CinemaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieDetailController : ControllerBase
    {
        private readonly MovieDetailService _movieDetailService;
        private readonly CinemaDbContext _context;

        public MovieDetailController(MovieDetailService movieDetailService, CinemaDbContext context)
        {
            _movieDetailService = movieDetailService;
            _context = context;
        }

        // Add a new movie detail
        [HttpPost]
        public IActionResult AddMovieDetail([FromBody] MovieDetail movieDetail)
        {
            try
            {
                _movieDetailService.Add(movieDetail);
                return Ok(new { Message = "Movie detail added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while adding the movie detail", Error = ex.Message });
            }
        }

        // Get all movie details
        [HttpGet]
        public IActionResult GetAllMovieDetails()
        {
            var movieDetails = _movieDetailService.GetAll();
            return Ok(movieDetails);
        }

        // Get movie detail by ID
        [HttpGet("{id}")]
        public IActionResult GetMovieDetailById(int id)
        {
            var movieDetail = _movieDetailService.GetById(id);
            if (movieDetail == null)
            {
                return NotFound(new { Message = "Movie detail not found" });
            }
            return Ok(movieDetail);
        }

        // Update a movie detail
        [HttpPut("{id}")]
        public IActionResult UpdateMovieDetail(int id, [FromBody] MovieDetail updatedMovieDetail)
        {
            if (updatedMovieDetail == null || id != updatedMovieDetail.Id)
            {
                return BadRequest(new { Message = "Invalid movie detail data" });
            }

            try
            {
                var existingMovieDetail = _movieDetailService.GetById(id);
                if (existingMovieDetail == null)
                {
                    return NotFound(new { Message = "Movie detail not found" });
                }

                _movieDetailService.Update(id, updatedMovieDetail);
                return Ok(new { Message = "Movie detail updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating the movie detail", Details = ex.Message });
            }
        }

        // Delete a movie detail by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteMovieDetail(int id)
        {
            var movieDetail = _movieDetailService.GetById(id);
            if (movieDetail == null)
            {
                return NotFound(new { Message = "Movie detail not found" });
            }
            _movieDetailService.DeleteById(id);
            return Ok(new { Message = "Movie detail deleted successfully" });
        }
    }
}