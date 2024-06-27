using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;
using E_Commerce.Interfaces;


namespace E_Commerce.Models;

public partial class Product: InterfaceId
{
    [BindNever]
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre es obligatorio")]
    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    [Required(ErrorMessage = "El precio es obligatorio")]
    public decimal Price { get; set; }

    [Required(ErrorMessage = "El stock es obligatorio")]
    public int Stock { get; set; }

    public int? CategoryId { get; set; }

    public DateTime? CreationDate { get; set; }

    public string? UrlImg { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}
