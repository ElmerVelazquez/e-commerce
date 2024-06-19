using E_Commerce.Interfaces;
using System;
using System.Collections.Generic;

namespace E_Commerce.Models;

public partial class ShoppingCart : InterfaceId
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public DateTime? CreationDate { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual User User { get; set; } = null!;
}
