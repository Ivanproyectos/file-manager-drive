using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    [ApiController]
    [Route("api/users/{userId}/folders")]
    public class UserFoldersController : Controller
    {
        [HttpGet()]
        public IActionResult GetFoldersByUserId(int userId)
        {
            return Ok($"Listando carpetas del usuario {userId}");
        }
    }
}
