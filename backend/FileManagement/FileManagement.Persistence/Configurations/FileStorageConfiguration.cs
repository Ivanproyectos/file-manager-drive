using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    public class FileStorageConfiguration : IEntityTypeConfiguration<FileStorage>
    {
        public void Configure(EntityTypeBuilder<FileStorage> builder)
        {
            builder.ToTable("FileStorages");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.StorageProviderId)
                .IsRequired();

            builder.Property(x => x.StorageIdentifier)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(x => x.StoragePath)
                 .HasMaxLength(500)
                 .IsRequired();

            builder.Property(x => x.UploadedAt)
                 .IsRequired();

            builder.HasOne(x => x.StorageProvider)
                .WithMany(x => x.FileStorages)
                .HasForeignKey(x => x.StorageProviderId)
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
