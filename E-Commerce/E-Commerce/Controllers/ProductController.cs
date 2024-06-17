using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace E_Commerce.Controllers
{
 
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _product;
        public ProductController(IProductRepository product)
        {
            _product = product;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _product.get());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _product.get(id));
        }
        [HttpGet("{lastpage}&{size}")]
        public async Task<IActionResult> Get(int lastpage, int size)
        {
            return Ok(await _product.get(lastpage, size));
        }

        [HttpPost]
        public async Task<IActionResult> Add(Product product)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _product.add(product));
        }

        [HttpPut]
        public async Task<IActionResult> Update(Product product)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _product.update(product));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _product.delete(id));
        }
    }
}
