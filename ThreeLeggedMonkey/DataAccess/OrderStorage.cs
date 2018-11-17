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
        private readonly string connectionString;

        public OrderStorage(IConfiguration config)
        {
            connectionString = config.GetSection("ConnectionString").Value;
        }

        public IEnumerable<Order> GetAllOrders()
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                var result = connection.Query<Order>(@"select * 
                                                    from [order]");

                return result;
            }
        }

        public IEnumerable<Order> GetOrderById(int id)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var result = connection.Query<Order>(@"select *
                                                    from [Order]
                                                    where Id = @id", new { id });
                return result;
            }
        }

        public bool AddOrder(Order order)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                var result = connection.Execute(@"INSERT INTO [Order] (CustomerId, IsComplete, IsActive) Values(@CustomerId, @IsComplete, @IsActive)", order);

                return result == 1;
            }
        }

        public bool UpdateOrder(Order order, int id)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                order.Id = id;
                connection.Open();

                var result = connection.Execute(@"UPDATE [Order]
                                                SET CustomerId = @CustomerId, IsComplete = @IsComplete, IsActive = @IsActive
                                                WHERE Id = @id", order);

                return result == 1;
            }
        }

        public bool DeactivateOrder(Order order, int id)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                order.Id = id;
                connection.Open();

                var result = connection.Execute(@"UPDATE [Order]
                                                SET CustomerId = @CustomerId, IsComplete = @IsComplete, IsActive = @IsActive
                                                WHERE Id = @id", order);
                return result == 1;
            }
        }

        public IEnumerable<Order> GetOrderByComletionStatus(bool? param)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                var result = connection.Query<Order>(@"select * from [Order]
                                                    where [order].IsComplete = @param", new { param });
                return result;
            }
        }

        public IEnumerable<OrderWithCustomer> GetOrderWithCustomer()
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                var result = connection.Query<OrderWithCustomer>(@"select o.Id, o.CustomerId, o.IsComplete, o.IsActive, c.FirstName, c.LastName
                                                                from [Order] as o, Customer as c 
                                                                where o.CustomerId = c.Id");

                return result;
            }
        }

        public bool DeleteOrder(int id)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                var result = connection.Execute(@"DELETE
                                                FROM [Order]
                                                WHERE Id = @id", new { id });
                return result == 1;
            }
        }

        public IEnumerable<OrderWithProductNamre> GetOrderWithProductNamres(int id)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();

                var result = connection.Query<OrderWithProductNamre>(@"select p.Name
                                                                    from [Order] as o
                                                                    JOIN OrderStage as os
                                                                    on o.Id = os.OrderId
                                                                    join Product as p
                                                                    on os.ProductId = p.Id 
                                                                    where o.id = 4", new { id });

                return result;
                
            }
        }
    }
}
