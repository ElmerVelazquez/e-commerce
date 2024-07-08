using E_Commerce.Models;

namespace E_Commerce.DTO
{
    public class UserDto
    {
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? Password { get; set; }

        public string? Phone { get; set; }

    }
}
