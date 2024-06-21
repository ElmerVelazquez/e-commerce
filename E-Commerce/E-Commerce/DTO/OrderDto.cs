namespace E_Commerce.DTO
{
    public class OrderDto
    {
        public int UserId { get; set; }
        public string? Status { get; set; }
        public decimal Total { get; set; }
    }
}
