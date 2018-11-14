using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ThreeLeggedMonkey.DataAccess;

namespace ThreeLeggedMonkey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingProgramController : ControllerBase
    {
        private readonly TrainingProgramAccess _trainingProgramAccess;

        public TrainingProgramController(IConfiguration config)
        {
            _trainingProgramAccess = new TrainingProgramAccess(config);
        }

        [HttpGet("GetTrainingPrograms")]
        // https:///localhost:44323/api/TrainingProgram/GetTrainingPrograms?completed=true
        public IActionResult GetTrainingPrograms([FromQuery(Name = "completed")]bool completed)
        {
            return Ok(_trainingProgramAccess.GetTrainingPrograms(completed));
        }

        [HttpGet("GetTrainingProgram/{id}")]
        public IActionResult GetTrainingProgramPerId(int id)
        {
            return Ok(_trainingProgramAccess.GetTrainingProgramPerId(id));
        }

        [HttpDelete("DeleteTrainingProgram/{id}")]
        public IActionResult DeleteTrainingProgram(int id)
        {
            return Ok(_trainingProgramAccess.DeleteTrainingProgram(id));
        }
    }
}