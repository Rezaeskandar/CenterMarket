using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController :BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails{Title ="thsis a bad request"});
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }

        [HttpGet ("validation-error")]
        public ActionResult GetvalidationError()
        {
            ModelState.AddModelError("Problem1","this is the first error");
            ModelState.AddModelError("Problem2","this is the second error");
            return ValidationProblem();

        }

        [HttpGet ("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This a server error");
        }
    }
}