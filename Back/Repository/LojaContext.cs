using Back.Model_Product;
using Back.Model_User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Back.Repository
{
    public class LojaContext: IdentityDbContext<User>
    {
        public LojaContext(DbContextOptions<LojaContext> options): base(options) { }

        public DbSet<Product> Products { get; set; }
    
        protected override void OnModelCreating(ModelBuilder builder)
        {
           base.OnModelCreating(builder);           
        }

    }
}