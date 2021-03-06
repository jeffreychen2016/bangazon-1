﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ThreeLeggedMonkey.DataAccess;
using ThreeLeggedMonkey.Models;

namespace ThreeLeggedMonkey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductStorage _storage;

        public ProductController(IConfiguration config)
        {
            _storage = new ProductStorage(config);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            return Ok(_storage.GetById(id));
        }

        [HttpGet("products")]
        public IActionResult GetAllProd()
        {
            return Ok(_storage.GetAll());
        }

        [HttpPost]
        public void AddProduct(Product product)
        {
            _storage.Add(product);
        }

        [HttpPut("updateproduct/{id}")]
        public IActionResult UpdateProduct(int id, Product product)
        {
            return Ok(_storage.UpdateProduct(id, product));
        }

        [HttpDelete("deleteproduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            return Ok(_storage.DeleteProduct(id));
        }
    }
}