using E_Commerce.Models;
using E_Commerce.Utilities;

namespace E_Commerce.Interfaces
{
    public interface IUserRepository: IBaseRepository<User> 
    {
        public Task<bool> EmailExist(string Email);
        public Task CreateShoppingCartAsync();
    }
}
