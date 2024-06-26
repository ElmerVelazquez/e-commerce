using AutoMapper;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Repository
{
    public class OrderDetailRepository: BaseRepository<OrderDetail>, IOrderDetailRepository
    {
        public OrderDetailRepository(EcommerceDbContext context, IMapper mapper)
            : base(context, mapper)
        {
        }
        public async Task updatetotalAsync(int id)
        {
            decimal total = 0;
            var details = await _context.OrderDetails.Where(u => u.OrderId == id).ToListAsync();
            foreach(var detail in details)
            {
                total += detail.Price * detail.Quantity;
            }
            var order = await _context.Orders.Where(u => u.Id == id).FirstAsync();
            order.Total = total;
            await _context.SaveChangesAsync();
        } 
    }
}
