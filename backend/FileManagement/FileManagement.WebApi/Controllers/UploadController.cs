using FileManagement.Core.Contracts.Request;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    public class UploadController : BaseApiController
    {
        [HttpPost("upload-chunk")]
        public async Task<IActionResult> UploadChunk(IFormFile file, [FromForm] ChunckRequest chunkRequest)
        {
            if(chunkRequest.UploadId is null)
            {
                return BadRequest("UploadId is required");
            }
            string tempFolder = Path.Combine(Path.GetTempPath(), "Uploads", chunkRequest.UploadId);
            if (!Directory.Exists(tempFolder))
            {
                Directory.CreateDirectory(tempFolder);

            }

            string filePath = string.Empty;
            if(chunkRequest.Uuid != null)
            {
                filePath = Path.Combine(tempFolder, $"{chunkRequest.Uuid}.part-{chunkRequest.ChunkIndex}");
}
            else
            {
                filePath = Path.Combine(tempFolder, file.FileName);
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok();
        }
        [HttpPost("start-upload")]
        public IActionResult StartUpload()
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
