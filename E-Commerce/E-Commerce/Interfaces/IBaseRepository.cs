using E_Commerce.DTO;
using E_Commerce.Models;
using E_Commerce.Utilities;

namespace E_Commerce.Interfaces
{
    public interface IBaseRepository<Entity> where Entity : class
    {
        public Task<Result<List<Entity>>> get();
        public Task<Result<Entity>> get(int id);
        public Task<Result<List<Entity>>> get(int lastpage, int size);
        public Task<Result<Dto>> add<Dto>(Dto dto) where Dto : class;
        public Task<Result<Dto>> update<Dto>(Dto dto, int id) where Dto : class;
        public Task<Result<Entity>> delete(int id);
    }
}
