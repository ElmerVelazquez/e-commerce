using E_Commerce.Models;
using System.ComponentModel.DataAnnotations;

namespace E_Commerce.DTO
{
    public enum PaymentType
    {
        CreditCard,
        DebitCard,
        PayPal,
        BankTransfer,
        Other
    }
    public class PaymentMethodDto
    {
        public int UserId { get; set; }

        public PaymentType Type { get; set; }

        public string Details { get; set; }
    }
}
