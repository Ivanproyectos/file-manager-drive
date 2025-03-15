using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace FileManagement.Core
{
    public static class DependencyContainer
    {
        public static IServiceCollection AddCore(this IServiceCollection services)
        {
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            return services;
        }
    }
}
