using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Dtos
{
    public record struct PeopleDto(
        int Id,
        string PersonType,
        string Name,
        string Identification,
        string Address,
        string Email,
        string Phone
        );
}
