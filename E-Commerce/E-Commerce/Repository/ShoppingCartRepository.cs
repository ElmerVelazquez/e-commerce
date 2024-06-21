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
    }
}
