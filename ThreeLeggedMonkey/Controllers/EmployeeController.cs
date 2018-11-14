using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ThreeLeggedMonkey.DataAccess;

namespace ThreeLeggedMonkey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeStorage _storage;

        public EmployeeController(IConfiguration config)
        {
            _storage = new EmployeeStorage(config);
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            return Ok(_storage.GetById(id));
        }

        [HttpGet("employees")]
        public IActionResult GetAllEmployees()
        {
            return Ok(_storage.GetAll());
        }
    }
}