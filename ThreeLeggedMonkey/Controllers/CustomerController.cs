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

        private readonly CustomerStorage _storage;

        // GET api/customer
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            var customers = new CustomerStorage(_config);
            return Ok(customers.GetAllCustomers());
        }

        // GET api/customer/{id}
        [HttpGet("{id}")]
        public ActionResult<string> GetById(int id)
        {
            var customer = new CustomerStorage(_config);
            return Ok(customer.GetById(id));
        }

        // PUT api/updatecustomer/{id}
        [HttpPut("updatecustomer/{id}")]
        public IActionResult UpdateCustomer(int id, Customers customer)
        {
            var customers = new CustomerStorage(_config);
            return Ok(customers.UpdateCustomer(id, customer));
        }

        // POST api/addnewcustomer
        [HttpPost]
        public void AddProduct(Customers customer)
        {
            var customerz = new CustomerStorage(_config);
            customerz.Add(customer);
        }
    }
}