using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    public class UploadController : BaseApiController
    {

        [HttpPost("upload-chunk")]
        public async Task<IActionResult> UploadChunk([FromForm] ChunckRequest chunckRequest)
        {
            return Ok(await Mediator.Send(chunckRequest));
        }
        [HttpGet("upload-start")]
        public IActionResult UploadStart()
        {
            return Ok(new { uploadId =  Guid.NewGuid() });
        }

    }
}
