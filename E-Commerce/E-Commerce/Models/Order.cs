using E_Commerce.Interfaces;
using System;
using System.Collections.Generic;

namespace E_Commerce.Models;

public partial class Order : InterfaceId
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public DateTime? OrderDate { get; set; }

    public string? Status { get; set; }

    public decimal Total { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual User User { get; set; } = null!;
}
