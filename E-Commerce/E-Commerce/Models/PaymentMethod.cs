using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using E_Commerce.Interfaces;

namespace E_Commerce.Models
{
    public enum PaymentType 
    {
        CreditCard,
        DebitCard,
        PayPal,
        BankTransfer,
        Other
    }
    public class PaymentMethod : InterfaceId
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        public PaymentType Type { get; set; }

        [Required]
        [MaxLength(255)]
        public string Details { get; set; }

        public virtual User User { get; set; }
    }
}
