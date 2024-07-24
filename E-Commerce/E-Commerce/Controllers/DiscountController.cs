using E_Commerce.DTO;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/discounts")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IBaseRepository<Discount> _repo;
        public DiscountController(IBaseRepository<Discount> repo)
        {
            _repo = repo;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _repo.get());
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _repo.get(id));
        }
        [AllowAnonymous]
        [HttpGet("{lastpage}&{size}")]
        public async Task<IActionResult> Get(int lastpage, int size)
        {
            return Ok(await _repo.get(lastpage, size));
        }
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> Add(DiscountDto Discountdto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _repo.add(Discountdto));
        }
        [Authorize(Roles = "admin")]
        [HttpPut]
        public async Task<IActionResult> Update(DiscountDto Discountdto, int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _repo.update(Discountdto, id));
        }
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _repo.delete(id));
        }
    }
}
