using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Request
{
    public record struct UpdatePeopleRequest(
        string PersonType,
        string FirstName,
        string LastName,
        string BussinessName,
        string Identification,
        string Address,
        string Email,
        string Phone
        );

}
