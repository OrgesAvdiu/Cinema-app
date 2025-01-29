namespace CinemaApp.Response
{
    public class PaymentResponse
    {
        public string PaymentUrl { get; set; }
        public string Message { get; set; }

        public PaymentResponse() { }

        public PaymentResponse(string message)
        {
            this.Message = message;
        }
    }
}