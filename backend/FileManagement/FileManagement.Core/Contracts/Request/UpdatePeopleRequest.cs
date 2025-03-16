using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Request
{
    public record struct UpdatePeopleRequest(
        int Id,
        string FirstName,
        string LastName,
        string BusinessName,
        string PersonType,
        string Email,
        string Address,
        string Phone
        );

}
