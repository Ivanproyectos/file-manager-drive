using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Request
{
    public record struct CreatePeopleRequest( 
        string FirstName,
        string LastName,
        string BussinessName,
        char PersonType,
        string Email,
        string Address,
        string Phone, 
        string Identification
        );

}
