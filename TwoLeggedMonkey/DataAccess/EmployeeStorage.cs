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
                                                                Id = E.Id,
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

        public bool Add(NewEmployee newEmployee)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Execute(@"INSERT INTO [dbo].[Employee]([FirstName], [LastName], [DepartmentId], [EmployeeTypeId], [AssignedComputer])
                                            VALUES(@FirstName, @LastName, @DepartmentId, @EmployeeTypeId, @AssignedComputer)", newEmployee);

                return result == 1;
            }
        }

        public bool UpdateEmployee(int id, NewEmployee newEmployee)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                newEmployee.Id = id;

                db.Open();

                var result = db.Execute(@"UPDATE Employee
                                            SET FirstName = @FirstName,
                                                LastName = @LastName,
                                                DepartmentId = @DepartmentId,
                                                EmployeeTypeId = @EmployeeTypeId,
                                                AssignedComputer = @AssignedComputer
                                            WHERE Id = @id", newEmployee);
                return result == 1;
            }
        }

        public bool Delete(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Execute(@"DELETE FROM Employee 
                                            WHERE Id = @Id", new { Id = id});

                return result == 1;
            }
        }
    }
}
