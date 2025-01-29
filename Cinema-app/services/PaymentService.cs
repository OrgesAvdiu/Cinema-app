using Cinema_app.model;
using CinemaApp.Response;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CinemaApp.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly string stripeSecretKey;

        public PaymentService(IConfiguration configuration)
        {
            stripeSecretKey = configuration["StripeSettings:SecretKey"];
        }

        public async Task<PaymentResponse> CreatePaymentLink(MovieDetail movieDetail)
        {
            StripeConfiguration.ApiKey = stripeSecretKey;

            var totalAmount = movieDetail.TotalPrice;
            var amountInCents = (long)(totalAmount * 100);

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                Mode = "payment",
                SuccessUrl = $"http://localhost:3000/payment/success?movieDetailId={movieDetail.Id}",
                CancelUrl = "http://localhost:3000/payment/failed",
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        Quantity = movieDetail.NumberOfTickets,
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "usd",
                            UnitAmount = amountInCents,
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = "Cinema Ticket"
                            }
                        }
                    }
                }
            };

            try
            {
                var service = new SessionService();
                Session session = await service.CreateAsync(options);
                var response = new PaymentResponse
                {
                    PaymentUrl = session.Url
                };
                return response;
            }
            catch (StripeException e)
            {
                return new PaymentResponse($"Failed to create payment link due to: {e.Message}");
            }
        }
    }
}