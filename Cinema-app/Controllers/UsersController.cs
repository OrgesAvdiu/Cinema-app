using Cinema_app.model;
using Cinema_app.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace Cinema_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public UsersController(
           UserManager<User> userManager,
           SignInManager<User> signInManager,
           IConfiguration configuration,
           RoleManager<IdentityRole> roleManager,
           IUserService userService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _roleManager = roleManager;
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] SignUp model)
        {
            if (string.IsNullOrEmpty(model.Role))
            {
                return BadRequest("Role is required.");
            }

            var user = new User { UserName = model.Name, Email = model.Email, Name = model.Name };
            var result = _userManager.CreateAsync(user, model.Password).Result;

            if (result.Succeeded)
            {
                if (!_roleManager.RoleExistsAsync(model.Role).Result)
                {
                    _roleManager.CreateAsync(new IdentityRole(model.Role)).Wait();
                }

                _userManager.AddToRoleAsync(user, model.Role).Wait();

                var isAdmin = model.Role == "Admin";
                return Ok(new
                {
                    Result = "User registered successfully.",
                    IsAdmin = isAdmin
                });
            }

            return BadRequest(new { Errors = result.Errors.Select(e => e.Description) });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Login model)
        {
            var user = _userManager.FindByEmailAsync(model.Email).Result;
            if (user != null)
            {
                var result = _signInManager.PasswordSignInAsync(user, model.password, isPersistent: false, lockoutOnFailure: false).Result;

                if (result.Succeeded)
                {
                    var roles = _userManager.GetRolesAsync(user).Result;
                    var isAdmin = roles.Contains("Admin");
                    return Ok(new
                    {
                        Message = "Login successful",
                        UserName = user.UserName,
                        Email = user.Email,
                        IsAdmin = isAdmin
                    });
                }

                if (result.IsLockedOut)
                {
                    return Unauthorized("User account is locked.");
                }

                if (result.IsNotAllowed)
                {
                    return Unauthorized("User is not allowed to sign in.");
                }
            }

            return Unauthorized("Invalid login attempt.");
        }

        [HttpGet("get-all-users")]
        public IActionResult GetAllUsers()
        {
            var allUsers = _userService.GetAllUsers();
            return Ok(allUsers);
        }

        [HttpGet("get-user-by-id/{id}")]
        public IActionResult GetUserById(string id)
        {
            var user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }

        [HttpPut("update-user-by-id/{id}")]
        public IActionResult UpdateUserById(string id, [FromBody] List<string> preferences)
        {
            _userService.UpdateUserPreferences(id, preferences);
            return Ok("User preferences updated successfully.");
        }

        [HttpDelete("delete-user-by-id/{id}")]
        public IActionResult DeleteUserById(string id)
        {
            var user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            _userService.DeleteUserById(id);
            return Ok("User deleted successfully.");
        }
    }
}
