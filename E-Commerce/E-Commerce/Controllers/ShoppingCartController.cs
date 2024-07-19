using E_Commerce.DTO;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace E_Commerce.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/shoppingcarts")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IShoppingCartRepository _repo;
        public ShoppingCartController(IShoppingCartRepository repo)
        {
            _repo = repo;
        }
        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _repo.get());
        }
        [Authorize(Roles = "admin,regular")]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _repo.get(id));
        }
        [Authorize(Roles = "admin")]
        [HttpGet("{lastpage}&{size}")]
        public async Task<IActionResult> Get(int lastpage, int size)
        {
            return Ok(await _repo.get(lastpage, size));
        }
        //[Authorize(Roles = "admin, regular")]
        //[HttpPost]
        //public async Task<IActionResult> Add(ShoppingCartDto shoppingcartdto)
        //{
        //    if (!ModelState.IsValid) return BadRequest(ModelState);
        //    return Ok(await _repo.add(shoppingcartdto));
        //}
        [Authorize(Roles = "admin, regular")]
        [HttpPut]
        public async Task<IActionResult> Update(ShoppingCartDto shoppingcartdto, int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _repo.update(shoppingcartdto, id));
        }
        [Authorize(Roles = "admin, regular")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _repo.delete(id));
        }
    }
}
