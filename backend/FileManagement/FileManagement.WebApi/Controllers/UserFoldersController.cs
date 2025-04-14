using AutoMapper;
using FileManagement.Core.Constants;
using FileManagement.Core.Interfaces.Services;
using FileManagement.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    [Authorize(Roles = $"{RoleConstants.Admin},{RoleConstants.User}")]
    [ApiController]
    [Route("api/users/folders")]
    public class UserFoldersController : BaseApiController
    {
        private readonly IUserFolderService _userFolderService;
        private readonly IFileService _fileService;
        public UserFoldersController(IUserFolderService userFolderService, IFileService fileService)
        {
            _userFolderService = userFolderService;
            _fileService = fileService;
        }

        [HttpGet()]
        public async Task<IActionResult> GetFolders()
        {
            return Ok(await _userFolderService.GerUserFolderAsync());
        }

        [HttpGet("{FolderId:int}/subfolders")]
        public async Task<IActionResult> GetFolderById(int FolderId)
        {
            return Ok(await _userFolderService.GetUserSubFolderAsync(FolderId));
        }
        [HttpGet("{FolderId:int}/files")]
        public async Task<IActionResult> GetFiles(int FolderId)
        {
            return Ok(await _fileService.GetFilesByFolderIdAsync(FolderId));
        }
    }
}
