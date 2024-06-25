using E_Commerce.Models;

namespace E_Commerce.Interfaces
{
    public interface IOrderDetailRepository : IBaseRepository<OrderDetail>
    {
        public Task updatetotalAsync(int id);
    }
}
