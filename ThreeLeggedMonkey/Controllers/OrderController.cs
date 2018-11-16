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

//        [HttpGet]
//        public IActionResult GetOrders([FromQuery] bool completed, [FromQuery] string _includes)
//        {
//            if (completed == false)
//            {
//                return Ok(_storage.GetOrderByComletionStatus(completed));
//
//           }
//            else if (completed == true)
//            {
//                return Ok(_storage.GetOrderByComletionStatus(completed));
//            }
//            else if (_includes == "customer")
//            {
//                return Ok(_storage.GetOrderWithCustomer());
//            }
//            else
//            {
//                return Ok(_storage.GetAllOrders());
//            }
//        }

        [HttpGet]
        public IActionResult GetOrderWithCustomer([FromQuery] string _includes)
        {
            if (_includes == "customer")
            {
                return Ok(_storage.GetOrderWithCustomer());
            }
            else
            {
                return Ok(_storage.GetAllOrders());
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

        [HttpGet("orderCompletionStatus/{param}")]
        public void GetOrderByComletionStatus(bool param)
        {
            _storage.GetOrderByComletionStatus(param);
        }
    }
}