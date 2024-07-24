using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using E_Commerce.Interfaces;

namespace E_Commerce.Models
{
    public enum DiscountType
    {
        Percentage,
        FixedAmount
    }
    public class Discount : InterfaceId
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }

        [Required]
        public DiscountType DiscountType { get; set; }

        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal DiscountValue { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime StartDate { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime EndDate { get; set; }

        public virtual Product Product { get; set; }

    }
}
