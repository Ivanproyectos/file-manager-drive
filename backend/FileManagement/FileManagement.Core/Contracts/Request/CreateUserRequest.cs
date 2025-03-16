using FileManagement.Core.Contracts.Response;
using MediatR;

namespace FileManagement.Core.Contracts.Request
{
    public record struct CreateUserRequest(
        string UserName,
        string Password, 
        string ConfirmPassword,
        CreatePeopleRequest People) : IRequest<CreateUserResponse>;

}
