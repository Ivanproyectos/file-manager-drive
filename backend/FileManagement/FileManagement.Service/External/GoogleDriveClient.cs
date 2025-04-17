using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Service.External
{
    public class GoogleDriveClient
    {
        private readonly string[] _scopes = { DriveService.Scope.DriveFile };
        private readonly string _applicationName = "MyApp";
        private readonly string _credentialsPath = "drive-credentials.json";
        public DriveService GetDriveService()
        {
            GoogleCredential credential;
            using (var stream = new FileStream(_credentialsPath, FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream).CreateScoped(_scopes);
            }

            return new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = _applicationName
            });
        }
    }
}
