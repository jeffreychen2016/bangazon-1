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
    public class ProductTypeController : ControllerBase
    {
        private ProductTypeAccess _productTypeAccess;

        public ProductTypeController(IConfiguration config)
        {
            _productTypeAccess = new ProductTypeAccess(config);
        }

        [HttpGet("producttypes")]
        public IActionResult GetAllProductTypes()
        {
            return Ok(_productTypeAccess.GetProductTypes());
        }
    }
}