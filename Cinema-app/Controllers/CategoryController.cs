using Cinema_app.model;
using Cinema_app.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Cinema_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoryService _categoryService;

        public CategoriesController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost]
        public IActionResult AddCategory([FromBody] Category category)
        {
            _categoryService.Add(category); // Changed to Add based on the service
            return Ok(new { Message = "Category added successfully" });
        }

        [HttpGet]
        public IActionResult GetAllCategories()
        {
            var categories = _categoryService.GetAll(); // Changed to GetAll based on the service
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _categoryService.GetById(id); // Changed to GetById based on the service
            if (category == null)
            {
                return NotFound(new { Message = "Category not found" });
            }
            return Ok(category);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            _categoryService.Delete(id); // Changed to Delete based on the service
            return Ok(new { Message = "Category deleted successfully" });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCategory(int id, [FromBody] Category category)
        {
            if (category == null)
            {
                return BadRequest(new { Message = "Category data is required" });
            }

            try
            {
                // Pass data to service
                _categoryService.Update(id, category); // Changed to Update based on the service

                return Ok(new { Message = "Category updated successfully" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Message = "An error occurred while updating the category",
                    Error = ex.Message
                });
            }
        }

        [HttpGet("search")]
        public IActionResult SearchCategories([FromQuery] string searchTerm)
        {
            var categories = _categoryService.Search(searchTerm); // Changed to Search based on the service
            return Ok(categories);
        }
    }
}
