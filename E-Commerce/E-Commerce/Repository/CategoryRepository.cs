using AutoMapper;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Repository
{
    public class CategoryRepository: BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(EcommerceDbContext context, IMapper mapper)
            : base(context, mapper)
        {
        }
        public override async Task<Result<List<Category>>> get()
        {
            var registros = await _context.Categories
                .Include(u => u.Products)
                .ToListAsync();
            if (registros == null)
            {
                return Result<List<Category>>.Fail("registros no encontrados");
            }
            return Result<List<Category>>.Success(registros);
        }

        public override async Task<Result<Category>> get(int id)
        {
            var registro = await _context.Categories
                .Include(u => u.Products)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (registro == null)
            {
                return Result<Category>.Fail("id no encontrado");
            }
            return Result<Category>.Success(registro);
        }
        public override async Task<Result<List<Category>>> get(int page, int size)
        {
            var registro = await _context.Categories
              .OrderBy(t => t.Id)
              .Where(b => b.Id >= page)
              .Take(size)
              .Include(u => u.Products)
              .ToListAsync();
            return Result<List<Category>>.Success(registro);
        }
    }
}
