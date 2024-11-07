using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Cinema_app.Services
{
    public class CategoryService
    {
        private readonly CinemaDbContext _context;

        public CategoryService(CinemaDbContext context)
        {
            _context = context;
        }

        // Add a new category
        public void AddCategory(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
        }

        // Get all categories
        public List<Category> GetAllCategories()
        {
            return _context.Categories.ToList();
        }

        // Get category by ID
        public Category GetCategoryById(int id)
        {
            return _context.Categories.FirstOrDefault(c => c.Id == id);
        }

        // Delete a category by ID
        public void DeleteCategory(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                _context.SaveChanges();
            }
        }

        // Search categories by name
        public List<Category> SearchCategories(string searchTerm)
        {
            return _context.Categories
                           .Where(c => c.Name.Contains(searchTerm))
                           .ToList();
        }
    }
}
