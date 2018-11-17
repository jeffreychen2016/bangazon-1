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
    public class DepartmentController : ControllerBase
    {
        private readonly DepartmentStorage _storage;

        public DepartmentController(IConfiguration config)
        {
            _storage = new DepartmentStorage(config);
        }

        [HttpGet("{id}")]
        public IActionResult GetDeptById(int id, [FromQuery] string _include)
        {
            if (_include == "employees")
            {
                return Ok(_storage.GetDeptEmployees(id));
            }
            else
            {
                return Ok(_storage.GetById(id));
            }
        }

        [HttpGet("depts")]
        public IActionResult GetAllDepts()
        {
            return Ok(_storage.GetAll());
        }

        [HttpPost]
        public void AddDepartment(Department department)
        {
            _storage.Add(department);
        }

        [HttpPut("updatedept/{id}")]
        public IActionResult UpdateDepartment(int id, Department department)
        {
            return Ok(_storage.UpdateDept(id, department));
        }
    }
}