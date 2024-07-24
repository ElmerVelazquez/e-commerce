using E_Commerce.DTO;
using E_Commerce.Models;
using E_Commerce.Utilities;

namespace E_Commerce.Interfaces
{
    public interface IProductRepository: IBaseRepository<Product>
    {
        Task<Result<List<ProductOutDto>>> GetAll();
        Task<Result<ProductOutDto>> GetAll(int id);
        Task<Result<List<ProductOutDto>>> GetAll(int page, int size);
    }
}
