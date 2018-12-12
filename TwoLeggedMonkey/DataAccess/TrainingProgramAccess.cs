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

        // Get All
        public IEnumerable<TrainingProgramForGet> GetAllTrainingPrograms()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                db.Open();

                var results = db.Query<TrainingProgramForGet>("select * from TrainingProgram");
                return results.ToList();
            }
        }

        // GET Completed
        public List<TrainingProgramForGetMap> GetTrainingPrograms(bool completed)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                var programsWithEmployeeName = dbConnection.Query<TrainingProgramForGetMap>(@"SELECT DISTINCT T.Id
	                                                                                                ,ProgramName
	                                                                                                ,EmployeeName = FirstName + ' ' + LastName
                                                                                                    ,StartDate
                                                                                                FROM TrainingProgram as T
                                                                                                LEFT JOIN EmployeeTrainings 
                                                                                                ON T.Id = EmployeeTrainings.TrainingProgramId
                                                                                                LEFT JOIN Employee 
                                                                                                ON EmployeeTrainings.EmployeeId = Employee.Id
                                                                                                ORDER BY Id");

                // created new class to hold the value, and return the list of new class instead
                if (completed == false)
                {
                    var result = from p in programsWithEmployeeName
                                 where p.StartDate >= DateTime.Today
                                 select new TrainingProgramForGetMap() {
                                     Id = p.Id,
                                     ProgramName = p.ProgramName,
                                     EmployeeName = p.EmployeeName,
                                     StartDate = p.StartDate
                                 };
                    return result.ToList();
                }
                else
                {
                    var result = from p in programsWithEmployeeName
                                 select new TrainingProgramForGetMap() {
                                     Id = p.Id,
                                     ProgramName = p.ProgramName,
                                     EmployeeName = p.EmployeeName,
                                     StartDate = p.StartDate
                                 };
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

        // GET program by id
        public TrainingProgramForEmployees GetTrainingProgramPerId(int id)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                var result  = dbConnection.QueryFirst<TrainingProgramForEmployees>(@"SELECT 
	                                                                        ProgramName
	                                                                        ,EmployeeName = FirstName + ' ' + LastName
                                                                        FROM TrainingProgram
                                                                        LEFT JOIN EmployeeTrainings 
                                                                        ON TrainingProgram.Id = EmployeeTrainings.TrainingProgramId
                                                                        LEFT JOIN Employee 
                                                                        ON EmployeeTrainings.EmployeeId = Employee.Id
                                                                        WHERE TrainingProgram.id = @id
                                                                        ORDER BY ProgramName", new { id });
                return result.ToList();
            }
        }

        // DELETE
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

        // Add new
        public bool AddTraningProgram(TrainingProgramForPost trainingProgramForPost)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();

                var result = dbConnection.Execute(@"INSERT INTO 
                                                       TrainingProgram (ProgramName,StartDate,EndDate,MaxAttendees)
                                                    VALUES (@ProgramName, @StartDate, @EndDate, @MaxAttendees)", trainingProgramForPost);
                return result == 1;
            }
        }

        // Update existing
        public bool UpdateTrainingProgram(int id, TrainingProgramForPut trainingProgramForPut)
        {
            using (var dbConnection = new SqlConnection(ConnectionString))
            {
                dbConnection.Open();
                trainingProgramForPut.Id = id;
                var result = dbConnection.Execute(@"UPDATE TrainingProgram 
                                                       SET ProgramName = @ProgramName
                                                          ,StartDate = @StartDate
                                                          ,EndDate = @EndDate
                                                          ,MaxAttendees = @MaxAttendees
                                                    WHERE id = @id", trainingProgramForPut);
                return result == 1;
            }
        }
    }
}
