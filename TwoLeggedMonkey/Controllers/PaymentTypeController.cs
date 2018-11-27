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
    public class PaymentTypeController : ControllerBase
    {
        private PaymentTypeStorage _storage;

        public PaymentTypeController(IConfiguration config)
        {
            _storage = new PaymentTypeStorage(config);
        }

        [HttpGet()]
        public IActionResult GetAllPaymentTypes()
        {
            //var paymentTypes = new PaymentTypeStorage(_config);
            return Ok(_storage.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetPaymentTypeById(int id)
        {
            //var paymentTypes = new PaymentTypeStorage(_config);
            return Ok(_storage.GetById(id));
        }

        [HttpPost]
        public void AddPaymentType(PaymentType paymentType)
        {
            _storage.Add(paymentType);
        }

        [HttpPut("edit/{id}")]
        public IActionResult UpdatePaymentType(int id, PaymentType paymentType)
        {
            return Ok(_storage.Update(id, paymentType));
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeletePaymentType (int id)
        {
            return Ok(_storage.Delete(id));
        }
    }
}