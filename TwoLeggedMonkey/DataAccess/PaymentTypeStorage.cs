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
    public class PaymentTypeStorage
    {
        private string connectionString;

        public PaymentTypeStorage(IConfiguration config)
        {
            connectionString = config.GetSection("ConnectionString").Value;
        }

        public List<PaymentType> GetAll()
        {
            using (var db = new SqlConnection(connectionString))
            {
                db.Open();

                var result = db.Query<PaymentType>("SELECT * FROM PaymentType");
                return result.ToList();
            }
        }

        public PaymentType GetById(int id)
        {
            using (var db = new SqlConnection(connectionString))
            {
                db.Open();

                var result = db.QueryFirst<PaymentType>(@"SELECT Id, PaymentTypeName, CustomerId FROM PaymentType WHERE Id = @id", new { id });
                return result;

            }
        }

        public bool Add(PaymentType paymentType)
        {
            using (var db = new SqlConnection(connectionString))
            {
                db.Open();

                var result = db.Execute(@"INSERT INTO [dbo].[PaymentType]([PaymentTypeName],[CustomerId])
                                        VALUES(@PaymentTypeName, @CustomerId)", paymentType);
                return result == 1;
            }
        }

        public bool Update(int id, PaymentType paymentType)
        {
            using (var db = new SqlConnection(connectionString))
            {

                paymentType.Id = id;
                db.Open();

                var result = db.Execute(@"UPDATE PaymentType
                                            SET PaymentTypeName = @PaymentTypeName,
                                            CustomerId = @Customerid
                                            WHERE Id = @id", paymentType);

                return result == 1;
            }

        }

        public bool Delete(int id)
        {
            using (var db = new SqlConnection(connectionString))
            {
                db.Open();

                var result = db.Execute(@"DELETE 
                                          FROM PaymentType
                                          WHERE PaymentType.Id = @id", new { id });

                return result == 1;
            }
        }

    }
}
