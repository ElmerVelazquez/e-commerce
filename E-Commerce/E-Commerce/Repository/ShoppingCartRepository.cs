using AutoMapper;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Repository
{
    public class ShoppingCartRepository : BaseRepository<ShoppingCart>, IShoppingCartRepository
    {
        public ShoppingCartRepository(EcommerceDbContext context, IMapper mapper)
            : base(context, mapper)
        {                       
        }
        public override async Task<Result<List<ShoppingCart>>> get()
        {
            var registros = await _context.ShoppingCarts
                .Include(u => u.CartItems)
                .ToListAsync();
            if (registros == null)
            {
                return Result<List<ShoppingCart>>.Fail("registros no encontrados");
            }
            return Result<List<ShoppingCart>>.Success(registros);
        }
        public override async Task<Result<ShoppingCart>> get(int id)
        {
            var registro = await _context.ShoppingCarts
                .Include(u => u.CartItems)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (registro == null)
            {
                return Result<ShoppingCart>.Fail("id no encontrado");
            }
            return Result<ShoppingCart>.Success(registro);
        }
        public override async Task<Result<List<ShoppingCart>>> get(int page, int size)
        {
            var registro = await _context.ShoppingCarts
              .OrderBy(t => t.Id)
              .Where(b => b.Id >= page)
              .Take(size)
              .Include(u => u.CartItems)
              .ToListAsync();
            return Result<List<ShoppingCart>>.Success(registro);
        }

    }
}
