using System.Threading.Tasks;
using Back.Model_Product;

namespace Back.Repository
{
    public interface IRepository
    {
        //GERAL
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        //PRODUTOS
        Task<Product[]> GetProductsAsync();
        Task<Product> GetProductsAsyncById(int Productid);
    }
}