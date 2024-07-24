using E_Commerce.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace E_Commerce.DTO
{
    public class ProductOutDto
    {

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public int? CategoryId { get; set; }
        public DateTime? CreationDate { get; set; }
        public string? UrlImg { get; set; }
        public decimal PriceWithDiscounts { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public virtual Category? Category { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
        public virtual ICollection<Discount> Discounts { get; set; }
        public virtual ICollection<WishlistItem> WishlistItems { get; set; }

    }
}
