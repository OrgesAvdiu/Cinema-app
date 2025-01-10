using Microsoft.AspNetCore.Identity;

namespace Cinema_app.model
{

    public class User : IdentityUser
    {
        public string Name { get; set; }
        public List<string> Preferences { get; set; } = new List<string>();
    }

}