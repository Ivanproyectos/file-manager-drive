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
            return Ok(await _folderService.getAllFolders());
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFolderRequest folderRequest)
        {
            return Ok(await Mediator.Send(folderRequest));
        }
    }
}
