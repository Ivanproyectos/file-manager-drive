using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Exceptions;
using FileManagement.Core.Interfaces.Services;
using Microsoft.AspNetCore.Http;

namespace FileManagement.Service.Services
{
    public class UploadFileService : IUploadFileService
    {
        public async Task MergeChunckAsync(ChunckRequest chunckRequest, string fileName, string tempFolder)
        {
            var chunks = Directory.GetFiles(tempFolder, $"*{chunckRequest.Uuid}.part*").Select(file => new
            {
                File = file,
                Order = file.LastIndexOf('-') + 1
            }).OrderBy(file => file.Order).Select(file => file.File).ToList();

            string finalFilePath = Path.Combine(tempFolder, fileName);
            using (var finalFileStream = new FileStream(finalFilePath, FileMode.Create))
            {
                foreach (var chunk in chunks)
                {
                    byte[] buffer = await System.IO.File.ReadAllBytesAsync(chunk);
                    await finalFileStream.WriteAsync(buffer, 0, buffer.Length);

                    System.IO.File.Delete(chunk);
                }
            }
        }

        public async Task UploadFileAsync(IFormFile file, ChunckRequest chunckRequest)
        {
            if (chunckRequest.UploadId is null)
            {
                throw new ValidationException("UploadId is null");
            }
            string tempFolder = Path.Combine(Path.GetTempPath(), "Uploads", chunckRequest.UploadId);
            if (!Directory.Exists(tempFolder))
            {
                Directory.CreateDirectory(tempFolder);

            }

            string filePath = string.Empty;

            if (chunckRequest.IsLastChunk)
            {
                filePath = Path.Combine(tempFolder, $"{chunckRequest.Uuid}.part-{chunckRequest.ChunkIndex}");
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                if (chunckRequest.TotalChunkCount - 1 == chunckRequest.ChunkIndex)
                {
                    _ = Task.Run(() => MergeChunckAsync(chunckRequest, file.FileName, tempFolder));
                }

                return;
            }


            filePath = Path.Combine(tempFolder, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

        }
    }
}
