using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ThreeLeggedMonkey.DataAccess;
using ThreeLeggedMonkey.Models;

namespace ThreeLeggedMonkey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingProgramController : ControllerBase
    {

        // passes configuration thru to storage

        private readonly TrainingProgramAccess _trainingProgramAccess;

        public TrainingProgramController(IConfiguration config)
        {
            _trainingProgramAccess = new TrainingProgramAccess(config);
        }

        // GET api/TrainingProgram/
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_trainingProgramAccess.GetAllTrainingPrograms());
        }

        // GET Completed Programs
        [HttpGet("GetTrainingPrograms")]
        // https:///localhost:44323/api/TrainingProgram/GetTrainingPrograms?completed=true
        public IActionResult GetTrainingPrograms([FromQuery(Name = "completed")]bool completed)
        {
            return Ok(_trainingProgramAccess.GetTrainingPrograms(completed));
        }

        // GET Program by Id
        [HttpGet("GetTrainingProgram/{id}")]
        public IActionResult GetTrainingProgramPerId(int id)
        {
            return Ok(_trainingProgramAccess.GetTrainingProgramPerId(id));
        }

        // DELETE
        [HttpDelete("DeleteTrainingProgram/{id}")]
        public IActionResult DeleteTrainingProgram(int id)
        {
            return Ok(_trainingProgramAccess.DeleteTrainingProgram(id));
        }

        // Add new
        [HttpPost("AddTrainingProgram")]
        public IActionResult AddTrainingProgram(TrainingProgramForPost trainingProgramForPost)
        {
            return Ok(_trainingProgramAccess.AddTraningProgram(trainingProgramForPost));
        }

        // Update
        [HttpPut("UpdateTrainingProgram/{id}")]
        public IActionResult UpdateTrainingProgram(int id, TrainingProgramForPut trainingProgramForPut)
        {
            return Ok(_trainingProgramAccess.UpdateTrainingProgram(id, trainingProgramForPut));
        }
    }
}