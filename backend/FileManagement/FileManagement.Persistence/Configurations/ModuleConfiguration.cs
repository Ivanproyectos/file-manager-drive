using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    public class ModuleConfiguration : IEntityTypeConfiguration<Module>
    {
        public void Configure(EntityTypeBuilder<Module> builder)
        {
            builder.ToTable("Modules");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .HasMaxLength(100)
                .IsRequired();

            builder.HasIndex(x => x.Name)
                .IsUnique();

            builder.Property(x => x.Description)
                .HasMaxLength(500)
                .IsRequired();

            builder.Property(x => x.ParentModuleId)
                .IsRequired(false);

            builder.Property(x => x.UrlPath)
                .HasMaxLength(200)
                .IsRequired(false);

             builder.Property(x => x.Icon)
                .HasMaxLength(200)
                .IsRequired(false);

            builder.Property(x => x.Order)
               .IsRequired();

            builder.HasOne(x => x.ParentModule)
                .WithMany(x => x.SubModules)
                .HasForeignKey(x => x.ParentModuleId)
                .OnDelete(DeleteBehavior.Restrict);

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
