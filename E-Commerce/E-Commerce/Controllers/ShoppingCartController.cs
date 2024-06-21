using E_Commerce.DTO;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IShoppingCartRepository _repo;
        public ShoppingCartController(IShoppingCartRepository repo)
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
            return Ok(await _repo.get(lastpage, size));
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Add(ShoppingCartDto shoppingcartdto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _repo.add(shoppingcartdto));
        }
        [HttpPut]
        public async Task<IActionResult> Update(ShoppingCartDto shoppingcartdto, int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _repo.update(shoppingcartdto, id));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _repo.delete(id));
        }
    }
}
