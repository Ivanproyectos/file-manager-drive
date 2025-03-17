using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/users/{userId}/folders")]
    public class UserFoldersController : BaseApiController
    {
        private readonly IUserFolderService _userFolderService;
        public UserFoldersController(IUserFolderService userFolderService) {
            _userFolderService = userFolderService;
        }

        [HttpGet()]
        public IActionResult GetFolders(int userId)
        {
            return Ok($"Listando carpetas del usuario {userId} toke");
        }

        [HttpGet("folderId")]
        public async Task<IActionResult> GetFolderById(int userId)
        {
            return Ok(await _userFolderService.GerUserFolderByUserIdAsync(userId));
        }
    }
}
