using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Settings
{
    public class JwtSetting
    {
        public string SecretKey { get; set; }
        public string Issuer { get; set; } 
        public string Audience { get; set; }
        public int ExpirationMinutes { get; set; } = 60;
    }
}
