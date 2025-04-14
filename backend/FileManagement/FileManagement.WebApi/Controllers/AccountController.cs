using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly IUserService _userService;
        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("auth")]
        public async Task<IActionResult> Auth([FromBody] LoginRequest loginRequest)
        {
            return Ok(await Mediator.Send(loginRequest));
        }
        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            return Ok(await _userService.GetUserByIdAsync(id));
        }
    }
}
