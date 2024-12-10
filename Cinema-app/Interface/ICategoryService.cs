using Cinema_app.model;

namespace Cinema_app.Interface
{
    public interface ICategoryService
    {
        void AddCategory(Category category);
        List<Category> GetAllCategories();
        Category GetCategoryById(int id);
        void DeleteCategory(int id);
        List<Category> SearchCategories(string searchTerm);
    }
}
