using System.Linq;
using System.Threading.Tasks;
using Back.Model_Product;
using Microsoft.EntityFrameworkCore;

namespace Back.Repository
{
    public class Repository : IRepository
    {

        private readonly LojaContext _context;

        public Repository(LojaContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);   
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        //INDO NO BANCO E RETORNANDO TODOS OS PRODUTOS
        public async Task<Product[]> GetProductsAsync()
        {
            IQueryable<Product> query = _context.Products;

            query = query.AsNoTracking().OrderBy(p => p.Id);

            return await query.ToArrayAsync();
        }

        //RETORNANDO POR ID
        public async Task<Product> GetProductsAsyncById(int Productid)
        {
            IQueryable<Product> query = _context.Products;

            query = query.AsNoTracking().OrderBy(p => p.Id).Where(c => c.Id == Productid);

            return await query.FirstOrDefaultAsync();
        }


    }
}