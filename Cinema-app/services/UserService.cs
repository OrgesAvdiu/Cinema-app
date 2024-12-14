using Cinema_app.model;
using CinemaApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Cinema_app.Services
{
    public class UserService : IUserService
    {
        private readonly CinemaDbContext _context;

        public UserService(CinemaDbContext context)
        {
            _context = context;
        }

        // Get all users synchronously
        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.ToList(); // Using synchronous method
        }

        // Get user by ID synchronously
        public User GetUserById(string id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id); // Using synchronous method
        }

        // Update user preferences synchronously
        public void UpdateUserPreferences(string id, List<string> preferences)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                user.Preferences = preferences;
                _context.SaveChanges(); // Save changes synchronously
            }
        }

        // Update user synchronously
        public void UpdateUser(User updatedUser)
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

        // Delete user by ID synchronously
        public void DeleteUserById(string id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges(); // Save changes synchronously
            }
        }
        // Add user synchronously
        public void AddUser(User newUser)
        {
            _context.Users.Add(newUser);
            _context.SaveChanges(); // Save changes synchronously
        }
    }
}
