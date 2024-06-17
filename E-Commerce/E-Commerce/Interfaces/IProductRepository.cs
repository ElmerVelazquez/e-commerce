using E_Commerce.Models;
using E_Commerce.Utilities;

namespace E_Commerce.Interfaces
{
    public interface IProductRepository
    {
        public Task<Result<List<Product>>> get();
        public Task<Result<Product>> get(int id);
        public Task<Result<List<Product>>> get(int lastpage, int size);
        public Task<Result<Product>> add(Product product);
        public Task<Result<Product>> update(Product product);
        public Task<Result<Product>> delete(int id);
    }
}
