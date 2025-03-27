using MediatR;

namespace FileManagement.Core.Contracts.Request
{
    public record struct UpdateUserRequest(
        int Id,
        UpdatePeopleRequest People) : IRequest<Unit>;

}
