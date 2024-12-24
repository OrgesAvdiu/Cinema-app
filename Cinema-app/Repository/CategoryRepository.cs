using Cinema_app.model;

namespace Cinema_app.Repository
{
    public interface CategoryRepository
    {
        void Add(Category category);
        List<Category> GetAll();
        Category GetById(int id);
        void Delete(int id);
        void Update(int id, Category updatedCategory);
        List<Category> Search(string searchTerm);
    }
}
