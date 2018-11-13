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
    }
}