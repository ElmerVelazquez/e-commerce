using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Repository
{
    public class ProductRepository: IProductRepository
    {
        public readonly EcommerceDbContext _context;
        public ProductRepository(EcommerceDbContext context)
        {
            _context = context;
        }
        public async Task<Result<List<Product>>> get()
        {
            var registros = await _context.Products.ToListAsync();
            if (registros == null)
            {
                return Result<List<Product>>.Fail("registros no encontrados");
            }
            return Result<List<Product>>.Success(registros);
        }
        public async Task<Result<Product>> get(int id)
        {
            var registro = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (registro == null)
            {
                return Result<Product>.Fail("id no encontrado");
            }
            return Result<Product>.Success(registro);
        }
        public async Task<Result<List<Product>>> get(int lastpage, int size)
        {
            var registro = await _context.Products
              .OrderBy(t => t.Id)
              .Where(b => b.Id > lastpage)
              .Take(size)
              .ToListAsync();
            return Result<List<Product>>.Success(registro);
        }
        public async Task<Result<Product>> add(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return Result<Product>.Success(product);

        }

        public async Task<Result<Product>> update(Product product)
        {
            var id = product.Id;
            var registro = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (registro == null)
            {
                return Result<Product>.Fail("El id no existe");
            }
            registro.Name = product.Name;
            registro.Description = product.Description;
            registro.Price = product.Price;
            registro.Stock = product.Stock;
            await _context.SaveChangesAsync();
            return Result<Product>.Success(product);
        }
        public async Task<Result<Product>> delete(int id)
        {
            var registro = _context.Products.FirstOrDefault(x => x.Id == id);
            if (registro == null)
            {
                return Result<Product>.Fail("El id no existe");
            }
            _context.Products.Remove(registro);
            await _context.SaveChangesAsync();
            return Result<Product>.Success(registro);
        }
    }
}
