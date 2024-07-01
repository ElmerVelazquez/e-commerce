using E_Commerce.Interfaces;
using System;
using System.Collections.Generic;

namespace E_Commerce.Models;

public partial class Address : InterfaceId
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Address1 { get; set; } = null!;

    public string City { get; set; } = null!;

    public string PostalCode { get; set; } = null!;

    public string Country { get; set; } = null!;

    public virtual User User { get; set; } = null!;

}
