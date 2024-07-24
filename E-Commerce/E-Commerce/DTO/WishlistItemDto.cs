using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.DTO
{
    public class WishlistItemDto
    {
        public int WishlistId { get; set; }

        public int ProductId { get; set; }
    }
}
