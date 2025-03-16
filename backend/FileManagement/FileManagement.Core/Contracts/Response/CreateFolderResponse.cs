namespace FileManagement.Core.Contracts.Response
{
    public record struct CreateFolderResponse(int Id, string Name, int ParentFolderId);

}
