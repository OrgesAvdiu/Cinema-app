using Cinema_app.model;
using CinemaApp.Models;
    using global::CinemaApp.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    namespace CinemaApp.Repository
    {
        public class CategoryRepository
        {
            private readonly CinemaDbContext _context;

            public CategoryRepository(CinemaDbContext context)
            {
                _context = context;
            }

            public async Task<List<Category>> GetAllAsync()
            {
                return await _context.Categories.ToListAsync();
            }

            public async Task<Category?> GetByIdAsync(long id)
            {
                return await _context.Categories.FindAsync(id);
            }

            public async Task AddAsync(Category category)
            {
                await _context.Categories.AddAsync(category);
                await _context.SaveChangesAsync();
            }

            public async Task UpdateAsync(Category category)
            {
                _context.Categories.Update(category);
                await _context.SaveChangesAsync();
            }

            public async Task DeleteAsync(long id)
            {
                var category = await GetByIdAsync(id);
                if (category != null)
                {
                    _context.Categories.Remove(category);
                    await _context.SaveChangesAsync();
                }
            }

            public async Task<Category?> FindByNameAsync(string name)
            {
                return await _context.Categories.FirstOrDefaultAsync(c => c.Name == name);
            }
        }
    }

