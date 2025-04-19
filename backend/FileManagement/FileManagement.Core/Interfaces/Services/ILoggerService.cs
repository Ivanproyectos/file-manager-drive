using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Interfaces.Services
{
    public interface ILoggerService
    {
        void LogError(string message, Exception ex);
        void LogInformation(string message);

    }
}
