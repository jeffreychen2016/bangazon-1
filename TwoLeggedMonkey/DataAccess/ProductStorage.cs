using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data.SqlClient;
using ThreeLeggedMonkey.Models;

namespace ThreeLeggedMonkey.DataAccess
{
    public class ProductStorage
    {
        private readonly string ConnectionString;

        public ProductStorage(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        public Product GetById(int id)
        {
            using(var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.QueryFirst<Product>(@"SELECT *
                                                                FROM Product
                                                                WHERE Product.Id = @id", new { id = id });
                return result;
            }
        }

        public List<Product> GetAll()
        {
            using(var connection = new SqlConnection(ConnectionString))
            {
                connection.Open();

                var result = connection.Query<Product>(@"SELECT * FROM Product");

                return result.ToList();
            }
        }

        public bool Add(Product product)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var result = db.Execute(@"INSERT INTO [dbo].[Product]([ProductTypeId], [Price], [Name], [Description], [Quantity])
                                            VALUES(@ProductTypeId, @Price, @Name, @Description, @Quantity)", product);

                return result == 1;
            }
        }

        public bool UpdateProduct(int id, Product product)
        {
            using(var db = new SqlConnection(ConnectionString))
            {
                product.Id = id;
                db.Open();
                var result = db.Execute(@"UPDATE Product
                                            SET ProductTypeId = @ProductTypeId,
                                                Price = @Price,
                                                Name = @Name,
                                                Description = @Description,
                                                Quantity = @Quantity
                                            WHERE Id = @id", product);
                return result == 1;
            }
        }

        public bool DeleteProduct(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();
                var result = db.Execute(@"DELETE 
                                            FROM Product
                                            WHERE Product.Id = @id", new { id });

                return result == 1;
            }
        }
    }
}
