using E_Commerce.DTO;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;

namespace E_Commerce.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _repo;
        public UserController(IUserRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _repo.get());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _repo.get(id));
        }
        [HttpGet("{lastpage}&{size}")]
        public async Task<IActionResult> Get(int lastpage, int size)
        {
            return Ok(await _repo.get(lastpage,size));
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Add(UserDto userdto)
        {
            if (await _repo.EmailExist(userdto.Email)) return BadRequest("El email ya existe");
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _repo.add(userdto));
        }
        [HttpPut]
        public async Task<IActionResult> Update(UserDto userdto, int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _repo.update(userdto, id));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _repo.delete(id));
        }
    }
}
