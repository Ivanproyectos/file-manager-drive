using FileManagement.Core.Constants;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    [Authorize(Roles = $"{RoleConstants.Admin}")]
    [ApiController]
    [Route("api/folder-permissions")]
    public class FolderPermissionController : BaseApiController
    {
        private readonly IFolderPermissionService _folderPermissionService;
        public FolderPermissionController(IFolderPermissionService folderPermissionService)
        {
            _folderPermissionService = folderPermissionService;
        }
        [HttpGet("{folderId}")]
        public async Task<IActionResult> GetPermissions(int folderId)
        {
           return Ok(await _folderPermissionService.GetFolderPermissionsByFolderIdAsync(folderId));
        }
    }
}
