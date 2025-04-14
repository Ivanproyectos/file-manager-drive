using Azure.Core;
using FileManagement.Core.Constants;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    public class UploadController : BaseApiController
    {
        private readonly IGoogleDriveService _googleDriveService;
        public UploadController(IGoogleDriveService googleDriveService)
        {
            _googleDriveService = googleDriveService;
        }
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
