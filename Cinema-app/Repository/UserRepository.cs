using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Repository
{
    public interface UserRepository
    {
        IEnumerable<User> GetAll();
        User GetById(string id);
        void Update(User updatedUser);
        void UpdatePreferences(string id, List<string> preferences);
        void DeleteById(string id);
        void Add(User newUser);
    }
}
