using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Persistence.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable("Roles");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.RoleName)
              .HasMaxLength(100)
              .IsRequired();

            builder.HasIndex(r => r.RoleName)
                .IsUnique();

            builder.Property(x => x.Description)
              .HasMaxLength(500)
              .IsRequired();

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
