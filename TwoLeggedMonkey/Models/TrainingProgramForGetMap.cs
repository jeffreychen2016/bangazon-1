using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ThreeLeggedMonkey.Models
{
    public class TrainingProgramForGetMap
    {
        public int Id { get; set; }
        public string ProgramName { get; set; }
        public string EmployeeName { get; set; }
        public DateTime StartDate { get; set; }
    }
}
