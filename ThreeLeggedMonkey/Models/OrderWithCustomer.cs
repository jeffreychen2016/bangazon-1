using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ThreeLeggedMonkey.Models
{
    public class OrderWithCustomer
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public bool IsComplete { get; set; }
        public bool IsActive { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
