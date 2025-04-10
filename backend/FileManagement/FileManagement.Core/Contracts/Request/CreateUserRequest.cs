using System.Security.Cryptography.X509Certificates;
using FileManagement.Core.Contracts.Response;
using MediatR;

namespace FileManagement.Core.Contracts.Request
{
    public record struct CreateUserRequest(
        List<int> Roles,
        bool IsExpired,
        DateTime? ExpirationDate,
        CreatePeopleRequest People) : IRequest<CreateUserResponse>;

}
