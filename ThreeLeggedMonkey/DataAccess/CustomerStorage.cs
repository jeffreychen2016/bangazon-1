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
    public class CustomerStorage
    {
        private readonly string connectionstring;

        public CustomerStorage(IConfiguration config)
        {
            connectionstring = config.GetSection("ConnectionString").Value;
        }

        public IEnumerable<Customers> GetAllCustomers()
        {
            using (var db = new SqlConnection(connectionstring))
            {
                db.Open();

                var results = db.Query<Customers>("select * from Customer");
                return results.ToList();
            }
        }

        public Customers GetById(int id)
        {
            using (var db = new SqlConnection(connectionstring))
            {
                db.Open();

                var result = db.QueryFirst<Customers>(@"select *
                                                                from Customer
                                                                where Customer.Id = @id", new { id = id });
                return result;
            }
        }

        public bool UpdateCustomer(int id, Customers customer)
        {
            using (var db = new SqlConnection(connectionstring))
            {
                customer.Id = id;
                db.Open();
                var result = db.Execute(@"update Customer
                                            set FirstName = @FirstName,
                                                LastName = @LastName,
                                                IsActive = @IsActive
                                            where Id = @id", customer);
                return result == 1;
            }
        }
    }
}
