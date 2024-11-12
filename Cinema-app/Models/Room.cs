namespace Cinema_app.model
{
    public class Room
    {
        public int Id { get; set; }
        public int RoomNumber { get; set; }
        public int Capacity { get; set; }
        public int CinemaId { get; set; }  
        public Cinema Cinema { get; set; } 
        public string Features { get; set; }
    }
}
