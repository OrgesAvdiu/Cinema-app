namespace Cinema_app.model
{
    public class Cinema
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public List<Room> Rooms { get; set; } = new List<Room>();
        public string ContactInfo { get; set; }
    }
}
