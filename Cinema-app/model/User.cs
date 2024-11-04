namespace Cinema_app.model
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public List<string> Preferences { get; set; } = new List<string>(); 
    }

}
