using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;

namespace E_Commerce.Repository
{
    public class UserRepository: ControllerBase, IUserRepository
    {
        public readonly EcommerceDbContext _context;
        public UserRepository(EcommerceDbContext context)
        {
            _context = context;
        }
        public async Task<Result<List<User>>> get()
        {
            var registros = await _context.Users.ToListAsync();
            if(registros == null)
            {
                return Result<List<User>>.Fail("registros no encontrados");
            }
            return Result<List<User>>.Success(registros);
        }
        public async Task<Result<User>> get(int id)
        {
            var registro = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (registro == null) {
                return Result<User>.Fail("id no encontrado"); 
            }
            return Result<User>.Success(registro);
        }
        public async Task<Result<List<User>>> get(int lastpage, int size)
        {
           var registro = await _context.Users
             .OrderBy(t => t.Id)
             .Where(b => b.Id > lastpage)
             .Take(size)
             .ToListAsync();
           return Result<List<User>>.Success(registro);
        }
        public async Task<Result<User>> add(User user)
        {
            if (await _context.Users.AnyAsync(x => x.Email.Equals(user.Email))) return Result<User>.Fail("El correo ya existe");
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Result<User>.Success(user);

        }

        public async Task<Result<User>> update(User user)
        {
            var id = user.Id;
            var registro = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (registro == null)
            {
                return Result<User>.Fail("El id no existe");                           
            }
            registro.Name = user.Name;
            registro.Email = user.Email;
            registro.Password = user.Password;
            registro.Phone = user.Phone;
            await _context.SaveChangesAsync();
            return Result<User>.Success(user);
        }
        public async Task<Result<User>> delete(int id)
        {
            var registro = _context.Users.FirstOrDefault(x => x.Id == id);
            if (registro == null)
            {
                return Result<User>.Fail("El id no existe");
            }
            _context.Users.Remove(registro);
            await _context.SaveChangesAsync();
            return Result<User>.Success(registro);
        }
    }
}
