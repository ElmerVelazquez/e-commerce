namespace E_Commerce.DTO
{
    public class ProductDto
    {
        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public decimal Price { get; set; }

        public int Stock { get; set; }

        public int? CategoryId { get; set; }

        public string? UrlImg { get; set; }
       
    }
}
