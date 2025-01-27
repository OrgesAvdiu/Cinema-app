using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Cinema_app.Repository;
using Newtonsoft.Json;

namespace Cinema_app.Services
{
    public class CategoryService : CategoryRepository
    {
        private readonly CinemaDbContext _context;

        public CategoryService(CinemaDbContext context)
        {
            _context = context;
        }

        public void Add(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
        }

        public List<Category> GetAll()
        {
            return _context.Categories.ToList();
        }

        public Category GetById(int id)
        {
            return _context.Categories.FirstOrDefault(c => c.Id == id);
        }

        public void Delete(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                _context.SaveChanges();
            }
        }

        public void Update(int id, Category updatedCategory)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
            {
                throw new KeyNotFoundException($"Category with ID {id} not found.");
            }

            Console.WriteLine($"Updating category ID {id} with data: {JsonConvert.SerializeObject(updatedCategory)}"); // Log incoming data

            category.Name = updatedCategory.Name ?? category.Name;
            category.Description = updatedCategory.Description ?? category.Description;

            if (updatedCategory.Movies != null && updatedCategory.Movies.Any())
            {
                category.Movies = updatedCategory.Movies;
            }

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating category ID {id}: {ex.Message}");
                throw;
            }
        }

        public List<Category> Search(string searchTerm)
        {
            return _context.Categories
                           .Where(c => c.Name.Contains(searchTerm))
                           .ToList();
        }

        // Implementing the GetCategoryIdByName method
        public int GetCategoryIdByName(string name)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Name == name);
            if (category == null)
            {
                throw new KeyNotFoundException($"Category with the name '{name}' not found.");
            }
            return category.Id;
        }
    }
}