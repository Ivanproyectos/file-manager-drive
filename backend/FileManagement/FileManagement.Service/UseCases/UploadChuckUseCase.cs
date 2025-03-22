using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Exceptions;
using MediatR;

namespace FileManagement.Service.UseCases
{
    public class UploadChuckUseCase : IRequestHandler<ChunckRequest, Unit>
    {
        public async Task<Unit> Handle(ChunckRequest request, CancellationToken cancellationToken)
        {
            if (request.UploadId is null)
            {
                throw new ValidationException("UploadId is null");
            }
            string tempFolder = Path.Combine(Path.GetTempPath(), "Uploads", request.UploadId);
            if (!Directory.Exists(tempFolder))
            {
                Directory.CreateDirectory(tempFolder);

            }

            string filePath = string.Empty;

            if (request.IsLastChunk)
            {
                filePath = Path.Combine(tempFolder, $"{request.Uuid}.part-{request.ChunkIndex}");
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.File.CopyToAsync(stream);
                }

                if ((request.TotalChunkCount - 1) == request.ChunkIndex)
                {
                    _ = Task.Run(() => MergeChunckAsync(request, request.File.FileName, tempFolder));
                }

                return Unit.Value;
            }


            filePath = Path.Combine(tempFolder, request.File.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.File.CopyToAsync(stream);
            }
            
            return Unit.Value;
        }
        private async Task MergeChunckAsync(ChunckRequest chunckRequest, string fileName, string tempFolder)
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
                    byte[] buffer = await File.ReadAllBytesAsync(chunk);
                    await finalFileStream.WriteAsync(buffer, 0, buffer.Length);

                    File.Delete(chunk);
                }
            }
        }
    }
}
