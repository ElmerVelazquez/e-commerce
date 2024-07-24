using E_Commerce.Interfaces;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace E_Commerce.Models;

public partial class User: InterfaceId
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre es obligatorio")]
    public string Name { get; set; } = null!;

    [EmailAddress(ErrorMessage = "El correo electrónico no es válido")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "La contraseña es obligatoria")]

    public string? Phone { get; set; }

    public string Rol { get; set; } = "regular";
    public DateTime? RegistrationDate { get; set; }
    public bool? verified { get; set; } = false;
    public string? verificationCode { get; set; }
    public virtual Password? Password { get; set; }
    public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<ShoppingCart> ShoppingCarts { get; set; } = new List<ShoppingCart>();
    public virtual ICollection<PaymentMethod> PaymentMethods { get; set; }
    public virtual ICollection<Wishlist> Wishlists { get; set; }
}
