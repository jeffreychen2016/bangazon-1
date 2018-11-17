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

        [HttpPost("addproducttype")]
        public IActionResult AddNewProductType(ProductType productType)
        {
            return Ok(_productTypeAccess.AddNewProductType(productType));
        }

        [HttpDelete("deleteproducttype/{id}")]
        public IActionResult DeleteProductType(int id)
        {
            return Ok(_productTypeAccess.DeleteProductType(id));
        }

        [HttpPut("updateproducttype/{id}")]
        public IActionResult UpdateProductType(int id, ProductType productType)
        {
            return Ok(_productTypeAccess.UpdateProductType(id, productType));
        }
    }
}