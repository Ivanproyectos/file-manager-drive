using FileManagement.Core.Contracts.Request;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    public class FilesController : BaseApiController
    {
        [HttpPost("file-permissions")]
        public async Task<IActionResult> Create(CreateFileRequest createFileRequest)
        {
            return Accepted(await Mediator.Send(createFileRequest));
        }
    }
}
