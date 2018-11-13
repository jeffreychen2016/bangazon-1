using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ThreeLeggedMonkey.DataAccess
{
    public class ProductTypeAccess
    {
        private string ConnectionString;

        public ProductTypeAccess(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }
    }
}
