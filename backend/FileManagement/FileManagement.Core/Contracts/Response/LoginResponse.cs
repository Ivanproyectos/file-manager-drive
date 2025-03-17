namespace FileManagement.Core.Contracts.Response
{
    public record struct LoginResponse(string Token, long ExpiresIn, string RefreshToken = "");
 
}
