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

        public List<Customers> GetByQuery(string q)
        {
            using (var db = new SqlConnection(connectionstring))
            {
                db.Open();

                var result = db.Query<Customers>(@"select *
                                                            from Customer
                                                            where FirstName
	                                                            like @q
                                                            or LastName
	                                                            like @q", new { q = "%" + q + "%"});
                return result.ToList();
            }
        }

        public List<CustomerProducts> GetCustomerProducts(int id, string include)
        {
            using (var db = new SqlConnection(connectionstring))
            {
                db.Open();

                var result = db.Query<CustomerProducts>(@"select
                                                    Product = P.Name
                                                        from Product P
                                                        JOIN OrderStage OS
                                                            ON P.Id = OS.ProductId
                                                        JOIN [Order] O
                                                            ON O.Id = OS.OrderId
                                                        JOIN Customer C
                                                            ON C.Id = O.CustomerId
                                                        WHERE C.Id = @id
                                                        Group By P.Name
                                                        Order BY P.Name", new { id });
                return result.ToList();
            }
        }

        public List<CustomerPaymentTypes> GetCustomerPaymentTypes(int id, string include)
        {
            using (var db = new SqlConnection(connectionstring))
            {
                db.Open();

                var result = db.Query<CustomerPaymentTypes>(@"select
                                                            PaymentTypeName
                                                                from Customer C
                                                                JOIN PaymentType PT
                                                                    ON C.Id = PT.CustomerId
                                                                where C.Id = @id", new { id });
                return result.ToList();
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

        public bool Add(Customers customer)
        {
            using (var db = new SqlConnection(connectionstring))
            {
                db.Open();

                var result = db.Execute(@"insert into [dbo].[Customer]( [FirstName], [LastName], [IsActive])
                                            values( @FirstName, @LastName, @IsActive)", customer);

                return result == 1;
            }
        }

        public List<CustomerWithNoOrders> GetCustomersWithNoOrders(bool activeFalse)
        {
            using (var dbConnection = new SqlConnection(connectionstring))
            {
                dbConnection.Open();

                var customerList = dbConnection.Query<CustomerWithNoOrders>(@"SELECT DISTINCT
	                                                            Customer.FirstName
	                                                            ,Customer.LastName
	                                                            ,[Order].CustomerId
                                                            FROM Customer
                                                            LEFT JOIN [Order] ON Customer.Id = [Order].CustomerId
                                                            ");
                if (!activeFalse)
                {
                    var result = from c in customerList
                                 where c.CustomerId == null
                                 select new CustomerWithNoOrders() { FirstName = c.FirstName, LastName = c.LastName };
                    return result.ToList();
                }
                else
                {
                    var result = from c in customerList
                                 select new CustomerWithNoOrders() { FirstName = c.FirstName, LastName = c.LastName };
                    return result.ToList();
                }
            }
        }
    }
}
