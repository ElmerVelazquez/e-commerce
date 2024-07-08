using E_Commerce.DTO;
using E_Commerce.Models;
using E_Commerce.Utilities;

namespace E_Commerce.Interfaces
{
    public interface IUserRepository: IBaseRepository<User> 
    {
        public Task<bool> EmailExist(string Email);
        public Task CreateShoppingCartAsync();
        public Task<Result<UserDto>> adduser(UserDto dto);
        public Task<Result> UpdatePassword(int id, string newpassword);
    }
}
