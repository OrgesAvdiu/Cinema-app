using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Interface
{
    public interface IUserService
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(string id);
        void UpdateUser(User updatedUser);  // Add this line to update a user
        void UpdateUserPreferences(string id, List<string> preferences);
        void DeleteUserById(string id);
        void AddUser(User newUser);
    }
}
