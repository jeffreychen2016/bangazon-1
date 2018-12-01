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

        public List<Computer> GetAllComputers()
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

                return computers.ToList();
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

        public bool DeleteComputerPerId(int id)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                var result = dbConnection.Execute(@"DELETE FROM Computers
                                                    WHERE id = @id", new { id });

                return result == 1;
            }
        }

        public bool AddComputer(Computer computer)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                var result = dbConnection.Execute(@"INSERT INTO 
                                                       Computers (SerialNumber,DateOfPurchase,DecommissionedDate,IsOperable)
                                                    VALUES (@SerialNumber,@DateOfPurchase,@DecommissionedDate,@IsOperable)", computer);

                return result == 1;
            }
        }

        public bool UpdateComputer(int id, Computer computer)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                computer.Id = id;
                var result = dbConnection.Execute(@"UPDATE Computers
                                                    SET SerialNumber = @SerialNumber
                                                       ,DateOfPurchase = @DateOfPurchase
                                                       ,DecommissionedDate = @DecommissionedDate
                                                       ,IsOperable = @IsOperable
                                                    WHERE id = @id",computer);

                return result == 1;
            }
        }
    }
}
