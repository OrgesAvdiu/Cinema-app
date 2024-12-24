using Cinema_app.model;
using Microsoft.AspNetCore.Mvc;
using Cinema_app.Services;

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

            _offersService.Add(offer); // Adjusted to Add based on service method
            return Ok(new { Message = "Offer added successfully" });
        }

        // GET: api/offers
        [HttpGet]
        public IActionResult GetAllOffers()
        {
            var offers = _offersService.GetAll(); // Adjusted to GetAll based on service method
            return Ok(offers);
        }

        // GET: api/offers/{id}
        [HttpGet("{id}")]
        public IActionResult GetOfferById(int id)
        {
            var offer = _offersService.GetById(id); // Adjusted to GetById based on service method
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
            var offer = _offersService.GetById(id); // Adjusted to GetById based on service method
            if (offer == null)
            {
                return NotFound(new { Message = "Offer not found" });
            }

            _offersService.Delete(id); // Adjusted to Delete based on service method
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

            var offers = _offersService.Search(searchTerm); // Adjusted to Search based on service method
            return Ok(offers);
        }

        // PUT: api/offers/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateOffer(int id, [FromBody] Offers offer)
        {
            if (offer == null)
            {
                return BadRequest(new { Message = "Offer data is required" });
            }

            try
            {
                _offersService.Update(id, offer); // Adjusted to Update based on service method
                return Ok(new { Message = "Offer updated successfully" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating the offer", Error = ex.Message });
            }
        }
    }
}
