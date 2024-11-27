using Cinema_app.model;
using Cinema_app.services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Cinema_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController : ControllerBase
    {
        private readonly OffersService _offersService;

        public OffersController(OffersService offersService)
        {
            _offersService = offersService;
        }

        // Add a new offer
        [HttpPost]
        public IActionResult AddOffers([FromBody] Offers offers)
        {
            _offersService.AddOffers(offers);
            return Ok(new { Message = "Offer added successfully" });
        }

        // Get all offers
        [HttpGet]
        public IActionResult GetAllOffers()
        {
            var offers = _offersService.GetAllOffers();
            return Ok(offers);
        }

        // Get offer by ID
        [HttpGet("{id}")]
        public IActionResult GetOffersById(int id)
        {
            var offer = _offersService.GetOffersById(id);
            if (offer == null)
            {
                return NotFound(new { Message = "Offer not found" });
            }
            return Ok(offer);
        }

        // Update an offer
        [HttpPut("{id}")]
        public IActionResult UpdateOffers(int id, [FromBody] Offers offers)
        {
            var existingOffer = _offersService.GetOffersById(id);
            if (existingOffer == null)
            {
                return NotFound(new { Message = "Offer not found" });
            }
            offers.Id = id; // Ensure the correct ID is used
            _offersService.UpdateOffers(offers);
            return Ok(new { Message = "Offer updated successfully" });
        }

        // Delete an offer by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteOffers(int id)
        {
            var offer = _offersService.GetOffersById(id);
            if (offer == null)
            {
                return NotFound(new { Message = "Offer not found" });
            }
            _offersService.DeleteOffers(id);
            return Ok(new { Message = "Offer deleted successfully" });
        }

        // Search offers by title or description
        [HttpGet("search")]
        public IActionResult SearchOffers([FromQuery] string searchTerm)
        {
            var offers = _offersService.SearchOffers(searchTerm);
            return Ok(offers);
        }
    }
}
