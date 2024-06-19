namespace E_Commerce.DTO
{
    public class AddressDto
    {
        public int UserId { get; set; }

        public string Address1 { get; set; } = null!;

        public string City { get; set; } = null!;

        public string PostalCode { get; set; } = null!;

        public string Country { get; set; } = null!;
    }
}
