using FileManagement.Core.Interfaces.Services;
using Google.Apis.Download;
using Google.Apis.Drive.v3;


namespace FileManagement.Service.External
{
    public class GoogleDriveService : IGoogleDriveService
    {
        private readonly GoogleDriveClient _client;

        public GoogleDriveService(GoogleDriveClient client)
        {
            _client = client;
        }

        public async Task<string> UploadFileAsync(string localPath, string fileName, string folderDriveId)
        {
            var service = _client.GetDriveService();

            var fileMetadata = new Google.Apis.Drive.v3.Data.File()
            {
                Name = fileName,
                Parents = new[] { folderDriveId }
            };

            using var stream = new FileStream(localPath, FileMode.Open);
            var request = service.Files.Create(fileMetadata, stream, "");
            request.Fields = "id";
            await request.UploadAsync();

            return request.ResponseBody.Id;
        }

        public async Task<Stream> DownloadFileAsync(string fileId)
        {
            var service = _client.GetDriveService();
            var request = service.Files.Get(fileId);
            var stream = new MemoryStream();

            // Suscribirse al evento de progreso
            request.MediaDownloader.ProgressChanged += (progress) =>
            {
                switch (progress.Status)
                {
                    case Google.Apis.Download.DownloadStatus.Downloading:
                        Console.WriteLine($"📥 Descargando... {progress.BytesDownloaded} bytes descargados");
                        break;
                    case Google.Apis.Download.DownloadStatus.Completed:
                        Console.WriteLine("✅ Descarga completada");
                        break;
                    case Google.Apis.Download.DownloadStatus.Failed:
                        Console.WriteLine("❌ Error en la descarga");
                        break;
                }
            };

            var progress = await request.DownloadAsync(stream);

            if (progress.Status == DownloadStatus.Completed)
            {
                stream.Position = 0;
                return stream;
            }
            else
            {
                throw new Exception("Error descargando archivo: " + progress.Status);
            }
        }

        public void DeleteFile(string fileId)
        {
            var service = _client.GetDriveService();
            service.Files.Delete(fileId).Execute();
        }

    }
}
