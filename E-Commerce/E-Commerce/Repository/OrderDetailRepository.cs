using AutoMapper;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Repository
{
    public class OrderDetailRepository : BaseRepository<OrderDetail>, IOrderDetailRepository
    {
        public OrderDetailRepository(EcommerceDbContext context, IMapper mapper)
            : base(context, mapper)
        {
        }
        public async Task updatepriceAsync(int iddetails = -1)
        {            
            if (iddetails == -1) {
                iddetails = await _context.OrderDetails.Select(u => u.Id).MaxAsync();
            }
            var details = await _context.OrderDetails.Where(u => u.Id == iddetails).FirstOrDefaultAsync();
            var price = await _context.Products.Where(u => u.Id == details.ProductId).Select(u => u.Price).FirstOrDefaultAsync();
            details.Price = price;
            await _context.SaveChangesAsync();
        }
        public async Task updatetotalAsync(int idorder)
        {
            decimal total = 0;
            var details = await _context.OrderDetails.Where(u => u.OrderId == idorder).ToListAsync();
            foreach (var detail in details)
            {
                total += detail.Price * detail.Quantity;
            }
            var order = await _context.Orders.Where(u => u.Id == idorder).FirstAsync();
            order.Total = total;
            await _context.SaveChangesAsync();
        }
        public override async Task<Result<OrderDetail>> delete(int id)
        {
            decimal total = 0;
            var registro = _context.OrderDetails.FirstOrDefault(x => x.Id == id);
            var idorder = registro.OrderId;            
            if (registro == null)
            {
                return Result<OrderDetail>.Fail("El id no existe");
            }
            _context.OrderDetails.Remove(registro);
            await _context.SaveChangesAsync();
            var details = await _context.OrderDetails.Where(u => u.OrderId == idorder).ToListAsync();
            foreach (var detail in details)
            {
                total += detail.Price * detail.Quantity;
            }
            var order = await _context.Orders.Where(u => u.Id == idorder).FirstAsync();
            order.Total = total;
            await _context.SaveChangesAsync();
            return Result<OrderDetail>.Success(registro);
        }
    }
}
