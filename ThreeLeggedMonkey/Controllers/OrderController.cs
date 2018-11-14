using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ThreeLeggedMonkey.Models;
using ThreeLeggedMonkey.DataAccess;

namespace ThreeLeggedMonkey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderStorage _storage;

        public OrderController(IConfiguration config)
        {
            _storage = new OrderStorage(config);
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            return Ok(_storage.GetAllOrders());
        }

        [HttpPost]
        public void AddOrder(Order order)
        {
            _storage.AddOrder(order);
        }

        [HttpPut("updateOrder/{id}")]
        public void UpdateOrder(Order order, int id)
        {
            _storage.UpdateOrder(order, id);
        }
    }
}