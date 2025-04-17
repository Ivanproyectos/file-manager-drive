using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Interfaces.Services;
using System.Net;
using System.Text.Json;
namespace FileManagement.WebApi.Middleware
{
    public class ExceptionHadlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;
        private readonly ILoggerService _loggerService;
        public ExceptionHadlerMiddleware(RequestDelegate next, IHostEnvironment env, ILoggerService loggerService)
        {
            _next = next;
            _env = env;
            _loggerService = loggerService;
        }
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                if (error is AggregateException aggregateException)
                {
                    error = aggregateException.Flatten().InnerExceptions.FirstOrDefault() ?? aggregateException;
                }

                var result = new ProblemDetailsDto();
                context.Response.ContentType = "application/json";
                switch (error)
                {
                    case Core.Exceptions.ValidationException ex:
                        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                        result.Title = "Error de validacion";
                        result.Message = ex.Message;
                        result.Details = ex.Failures;
                        break;
                    case KeyNotFoundException ex:
                        result.Title = ex.Message;
                        context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                        break;
                    case Core.Exceptions.UnauthorizedException ex:
                        result.Title = "Unauthorized";
                        result.Message = ex.Message;
                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        break;
                    default:    
                      
                        result.Title = "Error interno del servidor";
                        result.Message = _env.IsDevelopment() ? error.Message : "Consulte al administrador del sistema";
                        result.Details = Array.Empty<string>();
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        _loggerService.LogError(error.Message, error);
                        break;
                }

                result.StatusCode = context.Response.StatusCode;

                var options = new JsonSerializerOptions
                {
                    // Configurar para que los nombres de las propiedades se serialicen en camelCase
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };


                var json = JsonSerializer.Serialize(result, options);
                //await context.Response.WriteAsync(JsonSerializer.Serialize(result));
                await JsonSerializer.SerializeAsync(context.Response.Body, result, options);
            }
        }
    }
}
