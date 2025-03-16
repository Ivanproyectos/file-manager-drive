using FileManagement.Core.Contracts.Request;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    [ApiController]
    public class FoldersController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFolderRequest folderRequest)
        {
            return Ok(await Mediator.Send(folderRequest));
        }
    }
}
