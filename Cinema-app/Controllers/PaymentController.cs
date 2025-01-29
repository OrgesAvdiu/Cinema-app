using Cinema_app.model;
using Cinema_app.Services;
using CinemaApp.Response;
using CinemaApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CinemaApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService paymentService;
        private readonly MovieDetailService movieDetailService;

        public PaymentController(IPaymentService paymentService, MovieDetailService movieDetailService)
        {
            this.paymentService = paymentService;
            this.movieDetailService = movieDetailService;
        }

        [HttpPost("create-link")]
        public async Task<IActionResult> CreatePaymentLink([FromBody] MovieDetail movieDetail)
        {
            var paymentResponse = await paymentService.CreatePaymentLink(movieDetail);
            if (string.IsNullOrEmpty(paymentResponse.PaymentUrl))
            {
                return StatusCode(500, paymentResponse);
            }
            return Ok(paymentResponse);
        }

        [HttpPost("confirm-payment")]
        public IActionResult ConfirmPayment([FromBody] MovieDetail movieDetail)
        {
            // Save the movie detail after successful payment
            movieDetailService.Add(movieDetail);
            return Ok("Order saved successfully");
        }
    }
}