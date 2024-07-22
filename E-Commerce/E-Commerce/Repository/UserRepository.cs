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
        private readonly IShoppingCartRepository _shoppingcart;
        private readonly IEmailSenderRepository _emailsender;
        public UserRepository(EcommerceDbContext context, IMapper mapper, IShoppingCartRepository shoppingcart, IEmailSenderRepository emailsender)
            : base(context,mapper)
        {
            _shoppingcart = shoppingcart;
            _emailsender = emailsender;
        }
        public async Task<bool> EmailExist(string email)
        {
           return await _context.Users.AnyAsync(x => x.Email.Equals(email));               
        }
        public override async Task<Result<List<User>>> get()
        {
            var registros = await _context.Users
                .Include(u => u.Addresses)
                .Include(u => u.Orders)
                      .ThenInclude(p => p.OrderDetails)
                .Include(u => u.ShoppingCarts)
                      .ThenInclude(p => p.CartItems)
                .ToListAsync();
            if (registros == null)
            {
                return Result<List<User>>.Fail("registros no encontrados");
            }
            return Result<List<User>>.Success(registros);
        }
        public async Task CreateShoppingCartAsync()
        {
            var userid = await _context.Users.Select(u => u.Id).MaxAsync();
            var cart = new ShoppingCart
            {
                UserId = userid
            };
            _context.ShoppingCarts.Add(cart);
            await _context.SaveChangesAsync();

        }
        public override async Task<Result<User>> get(int id)
        {
            var registro = await _context.Users
                .Include(u => u.Addresses)
                .Include(u => u.Orders)
                      .ThenInclude(p => p.OrderDetails)
                .Include(u => u.ShoppingCarts)
                      .ThenInclude(p => p.CartItems)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (registro == null)
            {
                return Result<User>.Fail("id no encontrado");
            }
            return Result<User>.Success(registro);
        }
        public override async Task<Result<List<User>>> get(int page, int size)
        {
            var registro = await _context.Users
              .OrderBy(t => t.Id)
              .Where(b => b.Id >= page)
              .Take(size)
              .Include(u => u.Addresses)
              .Include(u => u.Orders)
                     .ThenInclude(p => p.OrderDetails)
              .Include(u => u.ShoppingCarts)
                     .ThenInclude(p => p.CartItems)
              .ToListAsync();
            return Result<List<User>>.Success(registro);
        }
        public async Task<Result<UserDto>> adduser(UserDto dto) 
        {
            var userregis = _mapper.Map<User>(dto);
            _context.Users.Add(userregis);
            await _context.SaveChangesAsync();
            var id = await _context.Users.Select(p => p.Id).MaxAsync();
            Password passwordregis = new Password
            {
                UserId = id,
                PasswordHash = PasswordHasher.HashPassword(dto.Password)
            };
            _context.Passwords.Add(passwordregis);
            await _context.SaveChangesAsync();
            return Result<UserDto>.Success(dto);
        }
        public async Task<Result> UpdatePassword(int id, string newpassword)
        {
            var regis = await _context.Passwords.FirstOrDefaultAsync(u => u.UserId == id);
            if(regis == null) return Result.Fail("usuario no encontrado");
            var userhashedpassword = PasswordHasher.HashPassword(newpassword);
            regis.PasswordHash = userhashedpassword;
            await _context.SaveChangesAsync();
            return Result.Success();
        }      
    }
}
