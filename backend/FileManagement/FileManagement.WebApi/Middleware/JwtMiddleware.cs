using System.Net;

namespace FileManagement.WebApi.Middleware
{

    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _secretKey;

        public JwtMiddleware(RequestDelegate next, string secretKey)
        {
            _next = next;
            _secretKey = secretKey;
        }

        private bool IsTokenExpired(string token, string secretKey)
        {
            return true;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null && IsTokenExpired(token, _secretKey))
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                await context.Response.WriteAsync("Token expirado");
                return;
            }

            await _next(context);
        }
    }
}
