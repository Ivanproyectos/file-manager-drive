using FileManagement.Core.Constants;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{

    [Authorize(Roles = $"{RoleConstants.Admin}, {RoleConstants.User}")]
    [ApiController]
    [Route("api/folders-status")]
    public class FoldersStatusController : BaseApiController
    {
        private readonly IFolderService _folderService;
        public FoldersStatusController(IFolderService folderService)
        {
            _folderService = folderService;
        }

        [HttpGet()]
        public async Task<IActionResult> GetStatusProcess()
        {
            return Ok(await _folderService.GetFolderProcessStatesAsync());
        }
    }
}
