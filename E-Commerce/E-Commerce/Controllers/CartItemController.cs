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
    public class CartItemController : ControllerBase
    {
        private readonly IBaseRepository<CartItem> _repo;
        public CartItemController(IBaseRepository<CartItem> repo)
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
        public async Task<IActionResult> Add(CartItemDto cartitemdto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _repo.add(cartitemdto));
        }
        [HttpPut]
        public async Task<IActionResult> Update(CartItemDto cartitemdto, int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _repo.update(cartitemdto, id));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _repo.delete(id));
        }
    }
}
