using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Request
{
    public class ChunckRequest: IRequest<Unit>
    {
        public string? UploadId { get; set; }
        public string? Uuid { get; set; }
        public int? ChunkIndex { get; set; }
        public int? TotalFileSize { get; set; }
        public int? ChunkSize { get; set; }
        public int? TotalChunkCount { get; set; }
        public int? ChunkByteOffset { get; set; }
        public bool IsLastChunk { get; set; }
        public IFormFile File { get; set; }
    }
}
