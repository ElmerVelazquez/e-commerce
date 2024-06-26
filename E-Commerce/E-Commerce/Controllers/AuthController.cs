﻿using E_Commerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace E_Commerce.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly EcommerceDbContext _context;
        public AuthController(IConfiguration configuration, EcommerceDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLogin user)
        {
            var regis = await _context.Users.Where(x => user.Email.Equals(x.Email)).FirstAsync();
            if (regis == null) return NotFound("usuario no encontrado");
            if (!regis.Email.Equals(user.Email) && !regis.Password.Equals(user.Password)) return Unauthorized("Credenciales invalidas");      

            var tokenhandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["jwtSettings:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, regis.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.Role, regis.Rol)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["jwtSettings:Issuer"],
                Audience = _configuration["jwtSettings:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenhandler.CreateToken(tokenDescriptor);
            var tokenString = tokenhandler.WriteToken(token);

            return Ok(new {id=regis.Id, rol= regis.Rol, Token = tokenString });
        }
        public class UserLogin
        {
            public required string Email { get; set; }
            public required string Password { get; set; }
            
        }
      
    }
}