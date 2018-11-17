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
        public IActionResult GetOrders([FromQuery] bool? completed, [FromQuery] string _include)
        {
            if (completed == false)
            {
                return Ok(_storage.GetOrderByComletionStatus(completed));

            }
            else if (_include == "customer")
            {
                return Ok(_storage.GetOrderWithCustomer());
            }
            else if (completed == true)
            {
                return Ok(_storage.GetOrderByComletionStatus(completed));
            }
            else
            {
                return Ok(_storage.GetAllOrders());
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id, [FromQuery] string _include)
        {
            if (_include == "products")
            {
                return Ok(_storage.GetOrderWithProductNamres(id));
            }
            else if (_include == "customer")
            {
                return Ok(_storage.GetOrderWithCustomerById(id));
            }
            else
            {
                return Ok(_storage.GetOrderById(id));
            }
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

        [HttpPut("deactivateOrder/{id}")]
        public void DeactivateOrder(Order order, int id)
        {
            _storage.DeactivateOrder(order, id);
        }

        [HttpDelete("deleteOrder/{id}")]
        public IActionResult DeleteOrder(int id)
        {
            return Ok(_storage.DeleteOrder(id));
        }

        [HttpGet("GetAllOrderWithProducts")]
        public IActionResult GetAllOrderWithProducts()
        {
            return Ok(_storage.GetAllOrderWithProducts());
        }
    }
}