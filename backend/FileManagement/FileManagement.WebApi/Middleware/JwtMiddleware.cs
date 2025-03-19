using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Interfaces.Services;
using Newtonsoft.Json;
using System.Net;

namespace FileManagement.WebApi.Middleware
{

    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _secretKey;
        private readonly ITokenService _tokenService;

        public JwtMiddleware(RequestDelegate next, string secretKey, ITokenService tokenService)
        {
            _next = next;
            _secretKey = secretKey;
            _tokenService = tokenService;
        }

        private bool IsTokenExpired(string token, string secretKey)
        {
            return _tokenService.ValidateToken(token) == null;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null && IsTokenExpired(token, _secretKey))
            {
                var result = new ProblemDetailsDto();
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                context.Response.ContentType = "application/json";

                result.title = "Token expirado";
                result.Message = "El token ha expirado";
                result.StatusCode = (int)HttpStatusCode.Unauthorized;
                result.Details = Array.Empty<string>();

                var json = JsonConvert.SerializeObject(result);
                await context.Response.WriteAsync(json);

                //await context.Response.WriteAsync("Token expirado");
                return;
            }

            await _next(context);
        }
    }
}
