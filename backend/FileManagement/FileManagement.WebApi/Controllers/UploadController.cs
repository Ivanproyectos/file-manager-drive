using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    public class UploadController : BaseApiController
    {
        private readonly IUploadFileService _uploadFileService;
        public UploadController(IUploadFileService uploadFileService)
        {
            _uploadFileService = uploadFileService;
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
        [HttpPost("complete-upload")]
        public IActionResult CompleteUpload(string uploadId)
        {
            //if (!UploadStore.ContainsKey(fileId))
            //{
            //    return NotFound("Invalid FileId");
            //}
            string tempFolder = Path.Combine(Path.GetTempPath(), "Uploads", uploadId);
            if (!Directory.Exists(tempFolder))
            {
                return BadRequest("No uploaded chunks found.");
            }

            var chunks = Directory.GetFiles(tempFolder, "*.part").OrderBy(f => int.Parse(Path.GetFileNameWithoutExtension(f)));

            //string finalFilePath = Path.Combine("C:\\FinalUploads", UploadStore[fileId].FileName);
            //using (var finalFileStream = new FileStream(finalFilePath, FileMode.Create))
            //{
            //    foreach (var chunk in chunks)
            //    {
            //        byte[] buffer = await File.ReadAllBytesAsync(chunk);
            //        await finalFileStream.WriteAsync(buffer, 0, buffer.Length);
            //    }
            //}

            //// Limpiar archivos temporales
            //Directory.Delete(tempFolder, true);
            //UploadStore.Remove(fileId);

            return Ok(new { message = "File assembled successfully", FilePath = uploadId });



        }
    }
}
