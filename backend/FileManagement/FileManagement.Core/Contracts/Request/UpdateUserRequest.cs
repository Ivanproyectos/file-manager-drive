using FileManagement.Core.Contracts.Response;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Contracts.Request
{
    public record struct UpdateUserRequest(
        int Id,
        string UserName,
        string? Password,
        string? ConfirmPassword,
        UpdatePeopleRequest People) : IRequest<Unit>;

}
