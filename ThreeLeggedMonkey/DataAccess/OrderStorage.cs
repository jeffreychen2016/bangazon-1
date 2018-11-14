using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using ThreeLeggedMonkey.Models;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ThreeLeggedMonkey.DataAccess
{
    public class OrderStorage
    {
        private readonly string conString;

        public OrderStorage(IConfiguration config)
        {
            conString = config.GetSection("ConnectionString").Value;
        }

        public IEnumerable<Order> GetAllOrders()
        {
            using (var connection = new SqlConnection(conString))
            {
                connection.Open();

                var result = connection.Query<Order>(@"select * 
                                                    from [order]");

                return result;
            }
        }
    }
}
