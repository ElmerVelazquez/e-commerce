using E_Commerce.DTO;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace E_Commerce.Controllers
{
    [EnableCors("AllowOrigin")]
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
            if (regis == null) return NotFound(Result.Fail("usuario no encontrado"));
            var regispass = await _context.Passwords.Where(x => regis.Id == x.UserId).FirstAsync();
            if (!PasswordHasher.VerifyPassword(regispass.PasswordHash, user.Password)) return Unauthorized(Result.Fail("Credenciales invalidas"));

            var token = GenerateAccessToken(regis);

            var refreshToken = GenerateRefreshToken();

            var refreshfield = await _context.Passwords.Where(u => u.UserId == regis.Id).FirstOrDefaultAsync();
            refreshfield.RefreshToken = refreshToken;
            await _context.SaveChangesAsync();

            return Ok(new { Id = regis.Id, Rol = regis.Rol, Token = token, RefreshToken = refreshToken });
        }
        [AllowAnonymous]
        [HttpPost("refreshtoken")]
        public async Task<IActionResult> RefreshToken(string refreshTokenRequest)
        {
            var refresht = await _context.Passwords.FirstOrDefaultAsync(x => x.RefreshToken == refreshTokenRequest);
            if (refresht == null)
                return NotFound(Result.Fail("Refresh token inválido"));

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == refresht.UserId);
            var token = GenerateAccessToken(user);

            return Ok(new { Token = token });
        }
        private string GenerateAccessToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["jwtSettings:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Role, user.Rol)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["jwtSettings:Issuer"],
                Audience = _configuration["jwtSettings:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var refreshToken = Guid.NewGuid().ToString();
            return refreshToken;
        }

        public class UserLogin
        {
            public required string Email { get; set; }
            public required string Password { get; set; }
            
        }
    }
}