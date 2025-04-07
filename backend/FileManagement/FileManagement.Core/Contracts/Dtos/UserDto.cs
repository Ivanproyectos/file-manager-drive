using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Dtos
{
    public record  struct UserDto(
     int Id,
     bool Status,
     PeopleDto People, 
     List<string> Roles
     );

}
