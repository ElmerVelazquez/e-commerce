namespace E_Commerce.Models
{
    public class Password
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string PasswordHash { get; set; }
        public virtual User User { get; set; }
    }
}
