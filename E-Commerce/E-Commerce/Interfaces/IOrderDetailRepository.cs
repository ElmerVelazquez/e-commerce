using E_Commerce.Models;

namespace E_Commerce.Interfaces
{
    public interface IOrderDetailRepository : IBaseRepository<OrderDetail>
    {
        public Task updatetotalAsync(int idorder);
        public Task updatepriceAsync(int id = -1);
    }
}
