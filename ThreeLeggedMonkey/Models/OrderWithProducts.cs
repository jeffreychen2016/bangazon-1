using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ThreeLeggedMonkey.Models
{
    public class OrderWithProducts
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int PaymentTypeId { get; set; }
    }
}
