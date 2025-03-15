using FileManagement.Core;
using FileManagement.Persistence;
using FileManagement.Service;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FileManagement.IoC
{
    public static class DependencyContainer
    {
        public static void AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddPersistenceInfrastructure(configuration);
            services.AddCore();
            services.AddServices();
        
        }
    }
}
