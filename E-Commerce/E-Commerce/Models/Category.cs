using E_Commerce.Interfaces;
using System;
using System.Collections.Generic;

namespace E_Commerce.Models;

public partial class Category : InterfaceId
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
