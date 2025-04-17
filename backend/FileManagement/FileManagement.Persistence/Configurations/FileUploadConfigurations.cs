using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    public class FileUploadConfigurations : IEntityTypeConfiguration<FileUploadConfiguration>
    {
        public void Configure(EntityTypeBuilder<FileUploadConfiguration> builder)
        {
             builder.ToTable("FileUploadConfigurations");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.MaxFileSizeBytes)
                .IsRequired();

            builder.Property(x => x.Description)
                .HasMaxLength(500)
                .IsRequired(false);

            builder.Property(x => x.CreatedBy)
        .IsRequired();

            builder.Property(x => x.CreatedAt)
               .IsRequired();

            builder.Property(x => x.UpdatedAt)
                .IsRequired(false);

            builder.Property(x => x.UpdatedBy)
               .IsRequired(false);

            builder.HasQueryFilter(x => x.DeletedAt == null);

            builder.HasData(
                new FileUploadConfiguration()
                {
                    Id = 1,
                    MaxFileSizeBytes = 2199023255552, //2TERAS
                    CreatedAt = DateTime.Now,
                    CreatedBy = 1,
                    UpdatedAt = DateTime.Now,
                    UpdatedBy = 1,
                    DeletedAt = null
                });
        }
    }
}
