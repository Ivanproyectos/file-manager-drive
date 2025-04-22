using FileManagement.Core.Constants;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    [Authorize(Roles = $"{RoleConstants.Admin}")]
    [ApiController]
    public class FoldersController : BaseApiController
    {
        private readonly IFolderService _folderService;
        public FoldersController(IFolderService folderService)
        {
            _folderService = folderService;
        }
        [HttpGet]
        public async Task<IActionResult> GetFolders([FromQuery]string? folderName)
        {
            return Ok(await _folderService.GetAllFoldersAsync(folderName));
        }
        [HttpGet("{folderId}")]
        public async Task<IActionResult> GetFolderById(int folderId)
        {
            return Ok(await _folderService.GetFolderByIdAsync(folderId));
        }
        [HttpGet("{id}/subfolders")]
        public async Task<IActionResult> GetSubFoldersAsync(int id)
        {
            return Ok(await _folderService.GetSubFoldersAsync(id));
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
        [HttpPatch("{folderId}")]
        public async Task<IActionResult> UpdateName([FromBody] PatchFolderRequest folderRequest)
        {
            return Ok(await Mediator.Send(folderRequest));
        }
        [HttpDelete("{folderId}")]
        public async Task<IActionResult> Delete(int folderId)
        {
            //await _folderService.DeleteFolderAndFiles(folderId);
            var deleteFolderRequest = new DeleteFolderRequest() { 
                FolderId = folderId 
            };
            await Mediator.Send(deleteFolderRequest);
            return NoContent();
        }
        [HttpPatch("{folderId}/status")]
        public async Task<IActionResult> UpdateStatus(int folderId)
        {
            await _folderService.UpdateStatus(folderId);
            return NoContent();
        }
        [HttpPut("{folderId}")]
        public async Task<IActionResult> UpdateStatus([FromBody] UpdateFolderRequest folderRequest)
        {
            return Ok(await Mediator.Send(folderRequest));
        }

        [HttpPost("status-process")]
        public async Task<IActionResult> ChangeStatus([FromBody] ChangeStatusRequest changeStatusRequest)
        {
            await _folderService.ChangeProcessStatus(changeStatusRequest);
            return NoContent();
        }

    }
}
