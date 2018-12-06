using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using TwoLeggedMonkey.DataAccess;

namespace TwoLeggedMonkey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeTypeController : ControllerBase
    {
        private EmployeeTypeAccess _employeeTypeAccess;

        public EmployeeTypeController(IConfiguration config)
        {
            _employeeTypeAccess = new EmployeeTypeAccess(config);
        }

        [HttpGet("GetAllEmployeeType")]
        public IActionResult GetAllComputers()
        {
            return Ok(_employeeTypeAccess.GetAllEmployeeTypes());
        }
    }
}