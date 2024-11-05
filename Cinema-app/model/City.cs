namespace Cinema_app.model
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Offers> Offers { get; set; } = new List<Offers>();
    }
}
