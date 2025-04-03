
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace FileManagement.Core.Hubs
{
    public class FileHub: Hub
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
        //public async Task SendToUser(string message)
        //{
        //    var userId = Context.UserIdentifier; // Esto está basado en el JWT que el cliente pasa en la conexión
        //    await Clients.User(userId).SendAsync("FileUploaded", message);
        //}

    }
}
