using AutoMapper;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Repository
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        public OrderRepository(EcommerceDbContext context, IMapper mapper)
            : base(context, mapper)
        {
        }
        public override async Task<Result<List<Order>>> get()
        {
            var registros = await _context.Orders
                .Include(u => u.OrderDetails)
                .ToListAsync();
            if (registros == null)
            {
                return Result<List<Order>>.Fail("registros no encontrados");
            }
            return Result<List<Order>>.Success(registros);
        }

        public override async Task<Result<Order>> get(int id)
        {
            var registro = await _context.Orders
                .Include(u => u.OrderDetails)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (registro == null)
            {
                return Result<Order>.Fail("id no encontrado");
            }
            return Result<Order>.Success(registro);
        }
        public override async Task<Result<List<Order>>> get(int page, int size)
        {
            var registro = await _context.Orders
              .OrderBy(t => t.Id)
              .Where(b => b.Id >= page)
              .Take(size)
              .Include(u => u.OrderDetails)
              .ToListAsync();
            return Result<List<Order>>.Success(registro);
        }


    }
}
