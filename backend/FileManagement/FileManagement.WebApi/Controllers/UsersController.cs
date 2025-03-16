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
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _userService.GetAllUsers());
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetUserById(int Id)
        {
            return Ok(await _userService.GetUserById(Id));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateUserRequest userRequest)
        {
            await Mediator.Send(userRequest);
            return NoContent();
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete([FromRoute] int Id)
        {
            await _userService.DeleteUser(Id);
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
