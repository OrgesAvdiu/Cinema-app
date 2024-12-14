using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Cinema_app.Interface;

namespace Cinema_app.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly CinemaDbContext _context;

        public CategoryService(CinemaDbContext context)
        {
            _context = context;
        }

        public void AddCategory(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
        }

        public List<Category> GetAllCategories()
        {
            return _context.Categories.ToList();
        }

        public Category GetCategoryById(int id)
        {
            return _context.Categories.FirstOrDefault(c => c.Id == id);
        }

        public void DeleteCategory(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                _context.SaveChanges();
            }
        }

        public void UpdateCategory(int id, Category updatedCategory)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
            {
                throw new KeyNotFoundException($"Category with ID {id} not found.");
            }

            // Update fields if provided
            category.Name = updatedCategory.Name ?? category.Name;
            category.Description = updatedCategory.Description ?? category.Description;

            // Handle updating movies if provided
            if (updatedCategory.Movies != null && updatedCategory.Movies.Any())
            {
                category.Movies = updatedCategory.Movies;
            }

            // Save changes to the database
            _context.SaveChanges();
        }


        public List<Category> SearchCategories(string searchTerm)
        {
            return _context.Categories
                           .Where(c => c.Name.Contains(searchTerm))
                           .ToList();
        }
    }
}
