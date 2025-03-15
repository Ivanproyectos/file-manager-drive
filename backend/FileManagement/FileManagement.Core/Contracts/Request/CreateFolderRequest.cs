using MediatR;

namespace FileManagement.Core.Contracts.Request
{
    public record struct CreateFolderRequest(string Name, Guid ParentId) : IRequest<int>
    {
    }
}
