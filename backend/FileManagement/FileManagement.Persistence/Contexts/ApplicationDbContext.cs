using FileManagement.Core.Common;
using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace FileManagement.Persistence.Contexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public DbSet<Folder> Folders { get; set; }
        public DbSet<UserFolder> UserFolders { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<People> Peoples { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<FilePermission> FilePermissions { get; set; }
        public DbSet<FolderPermission> FolderPermissions { get; set; }
        public DbSet<FileManagement.Core.Entities.File> Files { get; set; }
        public DbSet<FileStorage> FilesStorage { get; set; }
        public DbSet<FolderProcessHistory> FolderProcessHistories { get; set; }
        public DbSet<FolderProcessState> FolderProcessStates { get; set; }

        public DbSet<FileUploadConfiguration> FileUploadConfigurations { get; set; }

        
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableBaseEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedAt = DateTime.UtcNow;
                        entry.Entity.CreatedBy = 1; 
                        break;
                    case EntityState.Modified:
                        entry.Entity.UpdatedAt = DateTime.UtcNow;
                        entry.Entity.UpdatedBy = 1;
                        break;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
