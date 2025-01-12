namespace Cinema_app.model
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public DateTime ReleaseDate { get; set; }
        public double Rating { get; set; }
        public string Language { get; set; }
        public List<Category> Categories { get; set; } = new List<Category>();

        public String imageUrl { get; set; }
    }

}
