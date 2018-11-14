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
    public class EmployeeStorage
    {
        private readonly string ConnectionString;

        public EmployeeStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        public Employee GetById(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.QueryFirst<Employee>(@"SELECT 
	                                                            FullName = FirstName + ' ' + LastName,
	                                                            Department = D.DepartmentName,
	                                                            Computer = C.SerialNumber
                                                            FROM Employee E
                                                            JOIN Department D
                                                            ON E.DepartmentId = D.Id
                                                            JOIN Computers C
                                                            ON E.AssignedComputer = C.Id
                                                            WHERE E.Id = @id", new { id });
                return result;
            }
        }

        public List<Employee> GetAll()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.Query<Employee>(@"SELECT 
	                                                            FullName = FirstName + ' ' + LastName,
	                                                            Department = D.DepartmentName,
	                                                            Computer = C.SerialNumber
                                                            FROM Employee E
                                                            JOIN Department D
                                                            ON E.DepartmentId = D.Id
                                                            JOIN Computers C
                                                            ON E.AssignedComputer = C.Id");
                return result.ToList();
            }
        }
    }
}
