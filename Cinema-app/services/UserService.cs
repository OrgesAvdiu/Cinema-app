using Cinema_app.model;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Cinema_app.Services
{
    public class UserService
    {
        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        // Add a new user
        public IdentityResult AddUser(User user, string password)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            return _userManager.CreateAsync(user, password).Result; // Use .Result to get the result synchronously
        }

        // Delete user by Id
        public void DeleteUserById(int userId)
        {
            var user = _userManager.FindByIdAsync(userId.ToString()).Result;
            if (user != null)
            {
                _userManager.DeleteAsync(user).Wait(); // Use .Wait() for synchronous execution
            }
            else
            {
                throw new KeyNotFoundException($"User with ID {userId} not found.");
            }
        }

        // Get all users
        public List<User> GetAllUsers()
        {
            return _userManager.Users.ToList();
        }

        // Get user by Id
        public User GetUserById(int userId)
        {
            var user = _userManager.FindByIdAsync(userId.ToString()).Result;
            if (user == null)
                throw new KeyNotFoundException($"User with ID {userId} not found.");

            return user;
        }

        // Get user by username
        public User GetUserByName(string username)
        {
            var user = _userManager.FindByNameAsync(username).Result;
            if (user == null)
                throw new KeyNotFoundException($"User with username {username} not found.");

            return user;
        }

        // Update user preferences
        public void UpdateUserPreferences(int userId, List<string> preferences)
        {
            var user = _userManager.FindByIdAsync(userId.ToString()).Result;
            if (user != null)
            {
                user.Preferences = preferences;
                _userManager.UpdateAsync(user).Wait(); // Use .Wait() to perform synchronously
            }
            else
            {
                throw new KeyNotFoundException($"User with ID {userId} not found.");
            }
        }

        // Get a user's preferences
        public List<string> GetUserPreferences(int userId)
        {
            var user = _userManager.FindByIdAsync(userId.ToString()).Result;
            if (user == null)
                throw new KeyNotFoundException($"User with ID {userId} not found.");

            return user?.Preferences ?? new List<string>();
        }

        // Get user Id by username
        public int GetUserIdByName(string username)
        {
            var user = _userManager.FindByNameAsync(username).Result;
            if (user != null)
            {
                return int.TryParse(user.Id, out var userId) ? userId : throw new InvalidCastException("User ID cannot be converted to an integer.");
            }
            else
            {
                throw new ArgumentException("User not found", nameof(username));
            }
        }
    }
}
