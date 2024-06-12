using E_Commerce.Interfaces;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Repository
{
    public class UserRepository: ControllerBase, IUserRepository
    {
        public readonly EcommerceDbContext _context;
        public UserRepository(EcommerceDbContext context)
        {
            _context = context;
        }
        public async Task<List<User>> get()
        {
            return await _context.Users.ToListAsync();
        }
        public async Task<User> get(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

        }
        public async Task<List<string>> add(User user)
        {
            var _id = user.Id;
            if (await _context.Users.AnyAsync(x => x.Id == _id)!)
            {
                return null;
            }
            _context.Users.Add(user);
            return "hola";
        }

        public async Task<User> update(User user, int id)
        {
            return user;
        }
        public async Task<User> delete(int id)
        {
            return await _context.Users.FirstOrDefaultAsync();
        }

    }
}
