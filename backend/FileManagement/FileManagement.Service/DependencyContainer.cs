
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Exceptions;
using FileManagement.Core.Interfaces.Services;
using FileManagement.Core.Settings;
using FileManagement.Service.Behaviors;
using FileManagement.Service.Services;
using FileManagement.Service.UseCases;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Reflection;

namespace FileManagement.Service
{
    public static class DependencyContainer
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            services.Configure<JwtSetting>(configuration.GetSection("JWTSetting"));

            services.AddScoped<IUserService, UserService>();
            services.AddTransient<IPasswordService, PasswordService>();
            services.AddTransient<ITokenService, TokenService>();
            services.AddTransient<IUserFolderService, UserFolderService>();
            services.AddTransient<IFileService, FileService>();

            services.AddTransient<SeedUseCase>();

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }
             ).AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["JWTSetting:Issuer"],
                        ValidAudience = configuration["JWTSetting:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration["JWTSetting:SecretKey"])),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            var result = new ProblemDetailsDto();

                            context.NoResult();
                            context.Response.StatusCode = 500;
                            context.Response.ContentType = "application/json";

                            result.title = "Error authenticating";
                            result.Message = "Ocurrio un error en la autenticacion.";
                            result.StatusCode = context.Response.StatusCode;
                            return context.Response.WriteAsync(JsonConvert.SerializeObject(result));
                        },
                        OnChallenge = context =>
                        {
                            var result = new ProblemDetailsDto();
                            try
                            {
                                if (context.AuthenticateFailure is null)
                                {
                                    context.HandleResponse();
                                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                                    context.Response.ContentType = "application/json";

                                    result.title = "Unauthorized";
                                    result.Message = "Token es invalido.";
                                    result.StatusCode = context.Response.StatusCode;
                                    return context.Response.WriteAsync(JsonConvert.SerializeObject(result));
                                }
                                return Task.CompletedTask;
                            }
                            catch (Exception ex)
                            {
                                return Task.CompletedTask;
                            }
                        },
                        OnForbidden = context =>
                        {
                            var result = new ProblemDetailsDto();
                            context.Response.StatusCode = 400;
                            context.Response.ContentType = "application/json";

                            result.title = "Unauthorized";
                            result.Message = "Usted no tiene permiso para este recurso.";
                            result.StatusCode = context.Response.StatusCode;
                            return context.Response.WriteAsync(JsonConvert.SerializeObject(result));
                        }
                    };
                });


            return services;
        }
    }
}
