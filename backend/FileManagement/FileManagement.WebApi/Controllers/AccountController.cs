using FileManagement.Core.Contracts.Request;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{

    public class AccountController : BaseApiController
    {
        [HttpPost("auth")]
        public async Task<IActionResult> Auth([FromBody] LoginRequest loginRequest)
        {
            return Ok(await Mediator.Send(loginRequest));
        }
    }
}
