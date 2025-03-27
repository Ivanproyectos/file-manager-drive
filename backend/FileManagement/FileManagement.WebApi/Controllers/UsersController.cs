using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    [ApiController]
    public class UsersController : BaseApiController
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet("summary")]
        public async Task<IActionResult> GetUserSummary()
        {
            return Ok(await _userService.GetAllUserSummaryAsync());
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _userService.GetAllUsers());
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetUserById(int Id)
        {
            return Ok(await _userService.GetUserByIdAsync(Id));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Update([FromRoute] int Id, [FromBody] UpdateUserRequest userRequest)
        {
            userRequest.Id = Id;
            await Mediator.Send(userRequest);
            return NoContent();
        }
        [HttpPatch("status/{Id}")]
        public async Task<IActionResult> UpateStatus([FromRoute] int Id)
        {
            await _userService.UpdateStatusAsync(Id);
            return NoContent();
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete([FromRoute] int Id)
        {
            await _userService.DeleteUserAsync(Id);
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserRequest userRequest)
        {
            var newUser = await Mediator.Send(userRequest);
            return CreatedAtAction(nameof(GetUserById),new { id = newUser.Id }, newUser);
        }


    }
}
