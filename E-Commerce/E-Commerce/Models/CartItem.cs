using E_Commerce.Interfaces;
using System;
using System.Collections.Generic;

namespace E_Commerce.Models;

public partial class CartItem : InterfaceId
{
    public int Id { get; set; }

    public int CartId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public virtual ShoppingCart Cart { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
