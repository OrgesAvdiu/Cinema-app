using Cinema_app.model;
using Cinema_app.Services;
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

        // POST: api/offers
        [HttpPost]
        public IActionResult AddOffer([FromBody] Offers offer)
        {
            if (offer == null)
            {
                return BadRequest(new { Message = "Offer cannot be null" });
            }

            _offersService.AddOffer(offer);
            return Ok(new { Message = "Offer added successfully" });
        }

        // GET: api/offers
        [HttpGet]
        public IActionResult GetAllOffers()
        {
            var offers = _offersService.GetAllOffers();
            return Ok(offers);
        }

        // GET: api/offers/{id}
        [HttpGet("{id}")]
        public IActionResult GetOfferById(int id)
        {
            var offer = _offersService.GetOfferById(id);
            if (offer == null)
            {
                return NotFound(new { Message = "Offer not found" });
            }
            return Ok(offer);
        }

        // DELETE: api/offers/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteOffer(int id)
        {
            var offer = _offersService.GetOfferById(id);
            if (offer == null)
            {
                return NotFound(new { Message = "Offer not found" });
            }

            _offersService.DeleteOffer(id);
            return Ok(new { Message = "Offer deleted successfully" });
        }

        // GET: api/offers/search
        [HttpGet("search")]
        public IActionResult SearchOffers([FromQuery] string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
            {
                return BadRequest(new { Message = "Search term cannot be empty" });
            }

            var offers = _offersService.SearchOffers(searchTerm);
            return Ok(offers);
        }
    }
}
