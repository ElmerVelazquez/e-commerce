using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace E_Commerce.Models;

public partial class User
{
    [BindNever]
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre es obligatorio")]
    public string Name { get; set; } = null!;

    [EmailAddress(ErrorMessage = "El correo electrónico no es válido")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "El nombre es obligatorio")]
    public string Password { get; set; } = null!;

    public string? Phone { get; set; }

    public DateTime? RegistrationDate { get; set; }

    public int? AddressId { get; set; }

    public virtual Address? Address { get; set; }

    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<ShoppingCart> ShoppingCarts { get; set; } = new List<ShoppingCart>();
}
