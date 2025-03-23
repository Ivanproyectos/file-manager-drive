using Azure.Core;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Interfaces.Services;
using FileManagement.Service.Services;
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

        [HttpGet("test-drive")]
        public async Task<IActionResult> Test()
        {
            var uploadPath = Path.Combine(Path.GetTempPath(), "uploads", "f535706f-2e91-4812-9361-68d36fc9adf1");

            var files = Directory.GetFiles(uploadPath);

            foreach (var file in files)
            {
                string fileName = Path.GetFileNameWithoutExtension(file);
                var service = await _googleDriveService.UploadFileAsync(file, fileName, "1DfvIQxcgMKRhi0C0BVIWLMSHQXkMgDYr");
            }
              return Ok();
        }


    }
}
