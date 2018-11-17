using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ThreeLeggedMonkey.Models
{
    public class CustomerWithNoOrders
    {
        // make id nullable and i can map customerid to it when it is null
        public int? CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
