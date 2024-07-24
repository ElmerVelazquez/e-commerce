using AutoMapper;
using E_Commerce.DTO;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace E_Commerce.Repository
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(EcommerceDbContext context, IMapper mapper)
            : base(context, mapper)
        {
        }
        public async Task<Result<List<ProductOutDto>>> GetAll()
        {
            var registros = await _context.Products
                .Include(u => u.Discounts)
                .ToListAsync();
            if (registros == null)
            {
                return Result<List<ProductOutDto>>.Fail("registros no encontrados");
            }
            var productDtos = registros.Select(product =>
            {
                var productDto = _mapper.Map<ProductOutDto>(product);
                productDto.PriceWithDiscounts = CalculatePriceWithDiscount(product);
                return productDto;
            }).ToList();
          
            return Result<List<ProductOutDto>>.Success(productDtos);
        }

        public async Task<Result<ProductOutDto>> GetAll(int id)
        {
            var producto = await _context.Products
                .Include(p => p.Discounts)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (producto == null)
            {
                return Result<ProductOutDto>.Fail("Producto no encontrado.");
            }

            var productDto = _mapper.Map<ProductOutDto>(producto);
            productDto.PriceWithDiscounts = CalculatePriceWithDiscount(producto);

            return Result<ProductOutDto>.Success(productDto);
        }
        public async Task<Result<List<ProductOutDto>>> GetAll(int page, int size)
        {
            var registros = await _context.Products
                .Include(p => p.Discounts)
                .OrderBy(p => p.Id) // Asegura un orden consistente
                .Where(b => b.Id >= page)
                .Take(size)
                .ToListAsync();

            if (registros == null || !registros.Any())
            {
                return Result<List<ProductOutDto>>.Fail("Registros no encontrados.");
            }

            var productDtos = registros.Select(product =>
            {
                var productDto = _mapper.Map<ProductOutDto>(product);
                productDto.PriceWithDiscounts = CalculatePriceWithDiscount(product);
                return productDto;
            }).ToList();

            return Result<List<ProductOutDto>>.Success(productDtos);
        }
        private decimal CalculatePriceWithDiscount(Product product)
        {
            var discounts = product.Discounts;
            decimal finalPrice = product.Price;

            foreach (var discount in discounts)
            {
                if (discount.StartDate <= DateTime.Now && discount.EndDate >= DateTime.Now)
                {
                    if (discount.DiscountType == Models.DiscountType.Percentage)
                    {
                        finalPrice -= finalPrice * (discount.DiscountValue / 100);
                    }
                    else if (discount.DiscountType == Models.DiscountType.FixedAmount)
                    {
                        finalPrice -= discount.DiscountValue;
                    }
                }
            }

            return finalPrice < 0 ? 0 : finalPrice;
        }
    }
}

