using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    //[Authorize(Roles = $"{RoleConstants.Admin}")]
    public class FilesController : BaseApiController
    {
        private readonly IFileService _fileService;
        public FilesController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost()]
        public async Task<IActionResult> Create(CreateFileRequest createFileRequest)
        {
            return Accepted(await Mediator.Send(createFileRequest));
        }

        [HttpDelete("{fileId}")]
        public async Task<IActionResult> Delete(int fileId)
        {
            await _fileService.DeleteFileAsync(fileId);
            return NoContent();
        }


        [HttpGet("{fileId}/download")]
        public async Task<IActionResult> Download(int fileId)
        {
            var file = await _fileService.DownloadFileAsync(fileId);
            return File(file.File, file.MimeType, file.FileName);
        }
        [HttpGet("file-storage-status")]
        public async Task<IActionResult> FileStorageStatus()
        {
            return Ok(await _fileService.FileStorageStatusAsync());
        }
        
    }
}
