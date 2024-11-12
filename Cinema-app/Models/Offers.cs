namespace Cinema_app.model
{
    public class Offers
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Discount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<City> Cities { get; set; } = new List<City>();
    }
}
