
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace FileManagement.Core.Hubs
{
    public class FileUploadHub: Hub
    {
        public override async Task OnConnectedAsync()
        {
             // usar si se necesita tracking de conexiones
            await base.OnConnectedAsync();
        }
        public async Task NotificarProgreso(string mensaje)
        {
            await Clients.Caller.SendAsync("FileUploaded", mensaje);
        }

    }
}
