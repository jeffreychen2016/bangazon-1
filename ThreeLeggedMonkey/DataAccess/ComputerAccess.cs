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
    public class ComputerAccess
    {
        private string ConnectionString;

        public ComputerAccess(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        public List<string> GetAllComputers()
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                var computers = dbConnection.Query<Computer>(@"SELECT 
                                                            Id
                                                            ,SerialNumber
                                                            ,DateOfPurchase
                                                            ,DecommissionedDate
                                                            ,IsOperable
                                                          FROM computers");
                var result = from c in computers
                             select c.SerialNumber;

                return result.ToList();
            }
        }

        public Computer GetComputerPerId(int id)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                var result = dbConnection.QueryFirst<Computer>(@"SELECT 
                                                            Id
                                                            ,SerialNumber
                                                            ,DateOfPurchase
                                                            ,DecommissionedDate
                                                            ,IsOperable
                                                        FROM computers
                                                        WHERE Id = @id", new { id });

                return result;
            }
        }
    }
}
