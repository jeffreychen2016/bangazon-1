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
    public class ComputerController : ControllerBase
    {
        private ComputerAccess _computerAccess;

        public ComputerController(IConfiguration config)
        {
            _computerAccess = new ComputerAccess(config);
        }

        [HttpGet("GetAllComputers")]
        public IActionResult GetAllComputers()
        {
            return Ok(_computerAccess.GetAllComputers());
        }

        [HttpGet("GetComputer/{id}")]
        public IActionResult GetComputerPerId(int id)
        {
            return Ok(_computerAccess.GetComputerPerId(id));
        }

        [HttpDelete("DeleteComputer/{id}")]
        public IActionResult DeleteComputerPerId(int id)
        {
            return Ok(_computerAccess.DeleteComputerPerId(id));
        }

        [HttpPost("AddComputer")]
        public IActionResult AddComputer(Computer computer)
        {
            return Ok(_computerAccess.AddComputer(computer));
        }

        [HttpPut("UpdateComputer/{id}")]
        public IActionResult UpdateComputer(int id, Computer computer)
        {
            return Ok(_computerAccess.UpdateComputer(id, computer));
        }
    }
}