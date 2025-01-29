using Cinema_app.model;
using CinemaApp.Response;
using System.Threading.Tasks;

namespace CinemaApp.Services
{
    public interface IPaymentService
    {
        Task<PaymentResponse> CreatePaymentLink(MovieDetail movieDetail);
    }
}