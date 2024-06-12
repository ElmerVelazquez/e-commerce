using E_Commerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Threading.Tasks;

namespace E_Commerce.Interfaces
{
    public interface IUserRepository
    {
        public Task<List<User>> get();
        public Task<User> get(int id);
        public Task<string> add(User user);
        public Task<User> update(User user, int id);
        public Task<User> delete(int id);

    }
}
