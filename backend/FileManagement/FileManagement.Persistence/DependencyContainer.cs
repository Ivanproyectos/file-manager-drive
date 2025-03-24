using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Persistence.Contexts;
using FileManagement.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FileManagement.Persistence
{
    public static class DependencyContainer
    {
        public static void AddPersistenceInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)
                ));
            #region Repositories
            services.AddScoped<IFolderRepository, FolderRepository>();
            services.AddScoped<IUserFolderRepository, UserFolderRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPeopleRepository, PeopleRepository>();
            services.AddScoped<IUserRoleRepository, UserRoleRepository>();
            services.AddScoped<IFileRepository, FileRepository>();
            services.AddScoped<IFilePermissionRepository, FilePermissionRepository>();
            services.AddScoped<IFileStorageRepository, FileStorageRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>(); 
            #endregion


        }
    }
}
