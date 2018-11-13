using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using ThreeLeggedMonkey.Models;

namespace ThreeLeggedMonkey.DataAccess
{
    public class ProductTypeAccess
    {
        private string ConnectionString;

        public ProductTypeAccess(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        public List<ProductType> GetProductTypes()
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();
                var result = dbConnection.Query<ProductType>(@"SELECT 
                                                                Id,
                                                                ProductTypeName
                                                               FROM ProductType");
                return result.ToList();
            }
        }

        public ProductType GetProductTypePerId(int id)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();
                var result = dbConnection.QueryFirst<ProductType>(@"SELECT
                                                                     Id,
                                                                     ProductTypeName
                                                                    FROM ProductType
                                                                    WHERE id = @id", new { id });
                return result;
            }
        }
    }
}
