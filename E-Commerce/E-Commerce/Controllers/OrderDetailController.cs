﻿using E_Commerce.DTO;
using E_Commerce.Interfaces;
using E_Commerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailRepository _repo;
        public OrderDetailController(IOrderDetailRepository repo)
        {
            _repo = repo;
        }
        [Authorize(Roles = "admin, regular")]
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
        [Authorize(Roles = "admin, regular")]
        [HttpGet("{lastpage}&{size}")]
        public async Task<IActionResult> Get(int lastpage, int size)
        {
            return Ok(await _repo.get(lastpage, size));
        }
        [Authorize(Roles = "admin, regular")]
        [HttpPost]
        public async Task<IActionResult> Add(OrderDetailDto orderdetaildto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _repo.add(orderdetaildto);
            await _repo.updatetotalAsync(orderdetaildto.OrderId);
            return Ok();
        }
        [Authorize(Roles = "admin, regular")]
        [HttpPut]
        public async Task<IActionResult> Update(OrderDetailDto orderdetaildto, int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _repo.update(orderdetaildto, id);
            await _repo.updatetotalAsync(orderdetaildto.OrderId);
            return Ok();
        }
        [Authorize(Roles = "admin, regular")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.delete(id);
            await _repo.updatetotalAsync(id);
            return Ok();
        }
    }
}