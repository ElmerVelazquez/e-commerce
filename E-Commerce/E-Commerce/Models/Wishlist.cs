using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using E_Commerce.Interfaces;

namespace E_Commerce.Models
{
    public class Wishlist : InterfaceId
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public DateTime CreationDate { get; set; } = DateTime.UtcNow;

        public virtual User User { get; set; }
        public virtual ICollection<WishlistItem> WishlistItems { get; set; }
    }
}
