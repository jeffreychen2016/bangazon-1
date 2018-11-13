using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ThreeLeggedMonkey.DataAccess
{
    public class ComputerAccess
    {
        public ComputerAccess(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }
    }
}
