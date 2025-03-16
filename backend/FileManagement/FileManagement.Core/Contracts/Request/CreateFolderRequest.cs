using MediatR;

namespace FileManagement.Core.Contracts.Request
{
    public record struct CreateFolderRequest(string Name, int ParentId) : IRequest<int>
    {
    }
}
