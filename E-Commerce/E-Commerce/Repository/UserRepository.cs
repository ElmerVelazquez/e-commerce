using AutoMapper;
using E_Commerce.DTO;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;

namespace E_Commerce.Repository
{
    public class UserRepository: BaseRepository<User>, IUserRepository
    {


          public UserRepository(EcommerceDbContext context, IMapper mapper)
            : base(context,mapper)
        {
            
        }
        public async Task<bool> EmailExist(string email)
        {
           return await _context.Users.AnyAsync(x => x.Email.Equals(email));               
        }

    }
}
