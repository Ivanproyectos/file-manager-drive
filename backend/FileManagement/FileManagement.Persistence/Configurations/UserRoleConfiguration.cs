using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
    {
        public void Configure(EntityTypeBuilder<UserRole> builder)
        {
               builder.HasKey(ur => new { ur.UserId, ur.RoleId }); // Clave compuesta

                builder.HasOne(ur => ur.User)
                    .WithMany(u => u.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                builder.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .OnDelete(DeleteBehavior.Cascade);

                builder.Property(x => x.CreatedBy)
                 .IsRequired();

                builder.Property(x => x.CreatedAt)
                   .IsRequired();

                builder.Property(x => x.UpdatedAt)
                    .IsRequired(false);

                builder.Property(x => x.UpdatedBy)
                   .IsRequired(false);

            builder.HasQueryFilter(x => x.DeletedAt == null);
        }
    }
}
