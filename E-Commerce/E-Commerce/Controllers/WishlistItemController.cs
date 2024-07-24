﻿using E_Commerce.DTO;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/wishlistitems")]
    [ApiController]
    public class WishlistItemController : ControllerBase
    {
        private readonly IBaseRepository<WishlistItem> _repo;
        public WishlistItemController(IBaseRepository<WishlistItem> repo)
        {
            _repo = repo;
        }
        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _repo.get());
        }
        [Authorize(Roles = "admin, regular")]
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
        [Authorize(Roles = "admin, regular")]
        [HttpPost]
        public async Task<IActionResult> Add(WishlistItemDto WishlistItemdto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _repo.add(WishlistItemdto));
        }
        [Authorize(Roles = "admin, regular")]
        [HttpPut]
        public async Task<IActionResult> Update(WishlistItemDto WishlistItemdto, int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(await _repo.update(WishlistItemdto, id));
        }
        [Authorize(Roles = "admin, regular")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _repo.delete(id));
        }
    }
}
