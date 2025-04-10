using MediatR;

namespace FileManagement.Core.Contracts.Request
{
    public record struct UpdateUserRequest(
        int Id,
        List<int> Roles,
        bool IsExpired,
        DateTime? ExpirationDate,
        UpdatePeopleRequest People) : IRequest<Unit>;

}
