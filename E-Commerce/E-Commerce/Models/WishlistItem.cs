using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using E_Commerce.Interfaces;

namespace E_Commerce.Models
{
    public class WishlistItem : InterfaceId
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Wishlist")]
        public int WishlistId { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }

        public virtual Wishlist Wishlist { get; set; }
        public virtual Product Product { get; set; }
    }
}
