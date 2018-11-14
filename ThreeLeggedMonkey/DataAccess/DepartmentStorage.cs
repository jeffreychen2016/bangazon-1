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
    public class DepartmentStorage
    {
        private readonly string ConnectionString;

        public DepartmentStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        public Department GetById(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.QueryFirst<Department>(@"SELECT *
                                                    FROM Department
                                                    WHERE Id = @id", new { id });
                return result;
            }
        }

        public List<Department> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Query<Department>(@"SELECT * FROM Department");

                return result.ToList();
            }
        }

        public bool Add(Department department)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Execute(@"INSERT INTO [dbo].[Department]([DepartmentName])
                                            VALUES(@DepartmentName)", department);

                return result == 1;
            }
        }
    }
}
