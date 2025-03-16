using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    internal class RoleModuleConfiguration : IEntityTypeConfiguration<RoleModule>
    {
        public void Configure(EntityTypeBuilder<RoleModule> builder)
        {
               builder.ToTable("RoleModules");
               builder.HasKey(x => new { x.IdRole, x.IdModule });

               builder.HasOne(x => x.Role)
                   .WithMany(x => x.RoleModules)
                   .HasForeignKey(x => x.IdRole)
                   .OnDelete(DeleteBehavior.Cascade);

               builder.HasOne(x => x.Module)
                   .WithMany(x => x.RoleModules)
                   .HasForeignKey(x => x.IdModule)
                   .OnDelete(DeleteBehavior.Cascade);

                builder.Property(x => x.CreatedBy)
                 .IsRequired();

                builder.Property(x => x.CreatedAt)
                   .IsRequired();

                builder.Property(x => x.UpdatedAt)
                    .IsRequired(false);

                builder.Property(x => x.UpdatedBy)
                   .IsRequired(false);
        }
    }
}
