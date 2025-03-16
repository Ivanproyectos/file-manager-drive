using FileManagement.Core.Contracts.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
namespace FileManagement.WebApi.Middleware
{
    public class ExceptionHadlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;
        public ExceptionHadlerMiddleware(RequestDelegate next, IHostEnvironment env)
        {
            _next = next;
            _env = env;
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
                        result.title = "Error de validacion";
                        result.Details = ex.Failures;
                        break;
                    case KeyNotFoundException ex:
                        result.title = ex.Message;
                        context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                        break;
                    default:    
                      
                        result.title = "Error interno del servidor";
                        result.Details = _env.IsDevelopment() ? error.Message : "Consulte al administrador del sistema";
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }

                result.StatusCode = context.Response.StatusCode;

                var json = JsonSerializer.Serialize(result);
                //await context.Response.WriteAsync(JsonSerializer.Serialize(result));
                await JsonSerializer.SerializeAsync(context.Response.Body, result);
            }
        }
    }
}
