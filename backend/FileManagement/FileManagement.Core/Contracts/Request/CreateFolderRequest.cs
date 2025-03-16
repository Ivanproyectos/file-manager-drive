using FileManagement.Core.Contracts.Response;
using MediatR;

namespace FileManagement.Core.Contracts.Request
{
    public record struct CreateFolderRequest(
        string Name,
        int? ParentId, 
        List<int> UsersId, 
        bool AsignedFolder = false) : IRequest<CreateFolderResponse>
    {
    }
}
