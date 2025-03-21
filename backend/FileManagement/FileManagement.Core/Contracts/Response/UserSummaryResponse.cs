namespace FileManagement.Core.Contracts.Request
{
    public record struct UserSummaryResponse(
     int Id,
     string Email,
     string Name,
     string PersonType);

}
