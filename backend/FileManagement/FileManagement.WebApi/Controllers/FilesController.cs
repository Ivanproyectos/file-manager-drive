using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    public class FilesController : BaseApiController
    {
        private readonly IFileService _fileService;
        private readonly IFileRepository _fileRepository;
        public FilesController(IFileService fileService, IFileRepository fileRepository)
        {
            _fileService = fileService;
            _fileRepository = fileRepository;
        }

        [HttpPost()]
        public async Task<IActionResult> Create(CreateFileRequest createFileRequest)
        {
            return Accepted(await Mediator.Send(createFileRequest));
        }

        [HttpGet("{fileId}/download")]
        public async Task<IActionResult> Download(int fileId)
        {
            var file = await _fileRepository.GetFileByIdAsync(fileId);
            var stream = await _fileService.DownloadFile(file.FileStorage.StorageIdentifier);
            return File(stream, file.MimeType, file.FileName);
        }
    }
}
