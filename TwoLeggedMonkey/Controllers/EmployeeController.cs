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

        [HttpGet("Employee/{id}")]
        public IActionResult GetEmployeeWithFirstAndLastNameById(int id)
        {
            return Ok(_storage.GetEmployeeWithFirstAndLastNameById(id));
        }

        [HttpGet("employees")]
        public IActionResult GetAllEmployees()
        {
            return Ok(_storage.GetAll());
        }

        [HttpPost]
        public void AddEmployee(NewEmployee newEmployee)
        {
            _storage.Add(newEmployee);
        }

        [HttpPut("updateemployee/{id}")]
        public IActionResult UpdateEmployee(int id, NewEmployee newEmployee)
        {
            return Ok(_storage.UpdateEmployee(id, newEmployee));
        }

        [HttpDelete("deleteemployee/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            return Ok(_storage.Delete(id));
        }
    }
}