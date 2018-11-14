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
    public class TrainingProgramAccess
    {
        private string ConnectionString;

        public TrainingProgramAccess(IConfiguration config)
        {
            ConnectionString = config.GetSection("ConnectionString").Value;
        }

        public List<TrainingProgramForGetMap> GetTrainingPrograms(bool completed)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                var programsWithEmployeeName = dbConnection.Query<TrainingProgramForGet>(@"SELECT 
	                                                                        ProgramName
	                                                                        ,EmployeeName = FirstName + ' ' + LastName
                                                                            ,StartDate
                                                                        FROM TrainingProgram
                                                                        LEFT JOIN EmployeeTrainings 
                                                                        ON TrainingProgram.Id = EmployeeTrainings.TrainingProgramId
                                                                        LEFT JOIN Employee 
                                                                        ON EmployeeTrainings.EmployeeId = Employee.Id
                                                                        ORDER BY ProgramName");

                // created new class to hold the value, and return the list of new class instead
                if (completed == false)
                {
                    var result = from p in programsWithEmployeeName
                                 where p.StartDate >= DateTime.Today
                                 select new TrainingProgramForGetMap() { ProgramName = p.ProgramName, EmployeeName = p.EmployeeName };
                    return result.ToList();
                }
                else
                {
                    var result = from p in programsWithEmployeeName
                                 select new TrainingProgramForGetMap() { ProgramName = p.ProgramName, EmployeeName = p.EmployeeName };
                    return result.ToList();
                }


                //var result = programsWithEmployeeName
                //    .Where(p => p.StartDate >= DateTime.Today)
                //    .Select(x => new TrainingProgramForGetMap()
                //    {
                //        ProgramName = x.ProgramName,
                //        EmployeeName = x.EmployeeName
                //    });
            }
        }

        public TrainingProgramForGetMap GetTrainingProgramPerId(int id)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                var result  = dbConnection.QueryFirst<TrainingProgramForGetMap>(@"SELECT 
	                                                                        ProgramName
	                                                                        ,EmployeeName = FirstName + ' ' + LastName
                                                                        FROM TrainingProgram
                                                                        LEFT JOIN EmployeeTrainings 
                                                                        ON TrainingProgram.Id = EmployeeTrainings.TrainingProgramId
                                                                        LEFT JOIN Employee 
                                                                        ON EmployeeTrainings.EmployeeId = Employee.Id
                                                                        WHERE TrainingProgram.id = @id
                                                                        ORDER BY ProgramName", new { id });
                return result;
            }
        }

        public bool DeleteTrainingProgram(int id)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                var result = dbConnection.Execute(@"DELETE FROM 
                                                       TrainingProgram
                                                    WHERE id = @id", new { id });
                return result == 1;
            }
        }
    }
}
