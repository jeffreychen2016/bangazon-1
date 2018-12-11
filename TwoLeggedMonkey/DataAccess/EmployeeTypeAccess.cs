using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TwoLeggedMonkey.Models;

namespace TwoLeggedMonkey.DataAccess
{
    public class EmployeeTypeAccess
    {
        private readonly string ConnectionString;

        public EmployeeTypeAccess(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        public List<EmployeeType> GetAllEmployeeTypes()
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                var employeeTypes = dbConnection.Query<EmployeeType>(@"SELECT 
	                                                                    Id
	                                                                    ,EmployeeTypeName 
                                                                    FROM EmployeeType");

                return employeeTypes.ToList();
            }
        }
    }
}
