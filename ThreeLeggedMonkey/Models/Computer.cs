using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ThreeLeggedMonkey.Models
{
    public class Computer
    {
        public int Id { get; set; }
        public string SerialNumber { get; set; }
        public DateTime DateOfPurchase { get; set; }
        public DateTime DecommissionedDate { get; set; }
        public bool IsOperable { get; set; }
    }
}
