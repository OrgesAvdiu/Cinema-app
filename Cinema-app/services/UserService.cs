using Cinema_app.model;
using CinemaApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Cinema_app.Repository;

namespace Cinema_app.Services
{
    public class UserService : UserRepository
    {
        private readonly CinemaDbContext _context;

        public UserService(CinemaDbContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.ToList(); // Using synchronous method
        }

        public User GetById(string id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id); // Using synchronous method
        }

        public void Update(User updatedUser)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == updatedUser.Id);
            if (user != null)
            {
                user.Name = updatedUser.Name;
                user.Email = updatedUser.Email;
                user.Preferences = updatedUser.Preferences;
                _context.Users.Update(user); // Ensure entity is tracked and updated
                _context.SaveChanges(); // Commit changes to the database
            }
            else
            {
                throw new KeyNotFoundException("User not found");
            }
        }

        public void DeleteById(string id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges(); // Save changes synchronously
            }
        }

        public void Add(User newUser)
        {
            _context.Users.Add(newUser);
            _context.SaveChanges(); // Save changes synchronously
        }

        public void UpdatePreferences(string id, List<string> preferences)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                user.Preferences = preferences;
                _context.SaveChanges(); // Save changes synchronously
            }
        }

        public List<User> Search(string searchTerm)
        {
            return _context.Users
                           .Where(u => u.Name.Contains(searchTerm) || u.Email.Contains(searchTerm))
                           .ToList();
        }
    }
}
