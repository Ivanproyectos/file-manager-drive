using FileManagement.Core.Contracts.Request;
using MediatR;

namespace FileManagement.Service.Services
{
    public class CreateFolderService : IRequestHandler<CreateFolderRequest, int>
    {
        public Task<int> Handle(CreateFolderRequest request, CancellationToken cancellationToken)
        {
            return Task.FromResult(1);
        }
    }
}
