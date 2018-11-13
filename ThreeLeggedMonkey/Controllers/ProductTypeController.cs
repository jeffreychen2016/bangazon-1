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

        [HttpGet("producttypes/{id}")]
        public IActionResult GetProductTypePerId(int id)
        {
            return Ok(_productTypeAccess.GetProductTypePerId(id));
        }

        [HttpPost("addproducttype/{ProductTypeName}")]
        public IActionResult AddNewProductType(string ProductTypeName)
        {
            return Ok(_productTypeAccess.AddNewProductType(ProductTypeName));
        }

        [HttpDelete("deleteproducttype/{id}")]
        public IActionResult DeleteProductType(int id)
        {
            return Ok(_productTypeAccess.DeleteProductType(id));
        }
    }
}