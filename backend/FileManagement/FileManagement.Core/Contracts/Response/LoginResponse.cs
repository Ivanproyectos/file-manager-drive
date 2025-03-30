namespace FileManagement.Core.Contracts.Response
{
    public record struct LoginResponse(int UserId, string Token, long ExpiresIn, string RefreshToken = "");
 
}
