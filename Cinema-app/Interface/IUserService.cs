using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(string id);
        void UpdateUserPreferences(string id, List<string> preferences);
        void DeleteUserById(string id);
    }
}
