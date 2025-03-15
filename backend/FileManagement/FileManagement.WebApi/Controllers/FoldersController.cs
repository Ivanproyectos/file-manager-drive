using FileManagement.Core.Contracts.Request;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    [ApiController]
    public class FoldersController : BaseApiController
    {
        [HttpPost]
        public IActionResult Create([FromBody] CreateFolderRequest folderRequest)
        {
            return Ok(Mediator.Send(folderRequest));
        }
    }
}
