using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Dtos
{
    public record struct GeneratTokenDto(int Id, string UserName, string Email, List<string> Roles);

}
