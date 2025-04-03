using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    [ApiController]
    public class FoldersController : BaseApiController
    {
        private readonly IFolderService _folderService;
        public FoldersController(IFolderService folderService)
        {
            _folderService = folderService;
        }
        [HttpGet]
        public async Task<IActionResult> GetFolders()
        {
            return Ok(await _folderService.GetAllFoldersAsync());
        }
        [HttpGet("{Id}/subfolders")]
        public async Task<IActionResult> GetSubFoldersAsync(int Id)
        {
            return Ok(await _folderService.GetSubFoldersAsync(Id));
        }
        [HttpPost("subfolders")]
        public async Task<IActionResult> CreateSubFoldersAsync(CreateSubFolderRequest createSubFolderRequest)
        {
            return Ok(await Mediator.Send(createSubFolderRequest));
        }

        [HttpGet("{folderId}/files")]
        public async Task<IActionResult> GetFolderFiles(int folderId)
        {
            return Ok(await _folderService.GetFolderFiles(folderId));
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFolderRequest folderRequest)
        {
            return Ok(await Mediator.Send(folderRequest));
        }
    }
}
