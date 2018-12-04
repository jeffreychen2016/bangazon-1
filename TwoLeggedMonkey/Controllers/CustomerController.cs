using System;
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
    public class CustomerController : ControllerBase
    {
        // passes configuration thru to storage
        private IConfiguration _config;

        public CustomerController(IConfiguration config)
        {
            _config = config;
        }

        // GET api/customer
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get([FromQuery] string q)
        {
            var customers = new CustomerStorage(_config);

            if (q != null)
            {
                return Ok(customers.GetByQuery(q));
            }
            else
            {
                return Ok(customers.GetAllCustomers());
            }
            
        }

        // GET api/customer/{id}
        [HttpGet("{id}")]
        public ActionResult<string> GetById(int id, [FromQuery]string include)
        {
            var customer = new CustomerStorage(_config);
            if (include == "products")
            {
                return Ok(customer.GetCustomerProducts(id, include));
            }

            else if (include == "payments")
            {
                return Ok(customer.GetCustomerPaymentTypes(id, include));
            }
            
            else
            {
                return Ok(customer.GetById(id));
            }
        }

        // PUT api/updatecustomer/{id}
        [HttpPut("updatecustomer/{id}")]
        public IActionResult UpdateCustomer(int id, Customers customer)
        {
            var customers = new CustomerStorage(_config);
            return Ok(customers.UpdateCustomer(id, customer));
        }

        // PUT api/deactivate/{id}
        [HttpPut("deactivate/{id}")]
        public IActionResult DeactivateCustomer(int id)
        {
            var customers = new CustomerStorage(_config);
            return Ok(customers.DeactivateCustomer(id));
        }

        // POST api/addnewcustomer
        [HttpPost("addcustomer")]
        public void AddCustomer(Customers customer)
        {
            var customerz = new CustomerStorage(_config);
            customerz.Add(customer);
        }

        [HttpGet("customers")]
        public IActionResult GetCustomersWithNoOrders([FromQuery(Name = "Active")]bool active)
        {
            var customers = new CustomerStorage(_config);
            return Ok(customers.GetCustomersWithNoOrders(active));
        }
    }
}