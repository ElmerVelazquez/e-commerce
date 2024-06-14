using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Threading.Tasks;

namespace E_Commerce.Interfaces
{
    public interface IUserRepository
    {
        public Task<Result<List<User>>> get();
        public Task<Result<User>> get(int id);
        public Task<Result<List<User>>> get(int lastpage, int size);
        public Task<Result<User>> add(User user);
        public Task<Result<User>> update(User user);
        public Task<Result<User>> delete(int id);

    }
}
