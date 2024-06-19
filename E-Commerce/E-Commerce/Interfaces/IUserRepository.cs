using E_Commerce.DTO;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Threading.Tasks;

namespace E_Commerce.Interfaces
{
    public interface IUserRepository: IBaseRepository<User>
    {
        public Task<bool> EmailExist(string Email);

    }
}
