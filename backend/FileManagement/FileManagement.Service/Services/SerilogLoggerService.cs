using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileManagement.Core.Interfaces.Services;

namespace FileManagement.Service.Services
{
    using Serilog;
    internal class SerilogLoggerService: ILoggerService
    {
        public void LogError(string message, Exception ex)
        {
            Log.Error(ex, message);
        }

        public void LogInformation(string message, params object[] args)
        {
            Log.Information(message, args);
        }

        public void LogWarning(string message, params object[] args)
        {
            Log.Warning(message, args);
        }
    }
}
