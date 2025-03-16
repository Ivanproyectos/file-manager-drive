using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    public class StorageProviderConfiguration : IEntityTypeConfiguration<StorageProvider>
    {
        public void Configure(EntityTypeBuilder<StorageProvider> builder)
        {
            builder.ToTable("SourceProviders");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.ProviderName)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(x => x.Description)
               .HasMaxLength(500)
               .IsRequired();

            builder.HasIndex(x => x.ProviderName)
                .IsUnique();

            builder.Property(x => x.CreatedBy)
             .IsRequired();

            builder.Property(x => x.CreatedAt)
               .IsRequired();

            builder.Property(x => x.UpdatedAt)
                .IsRequired(false);

            builder.Property(x => x.UpdatedBy)
               .IsRequired(false);

            //builder.HasMany(x => x.FileStorages)
            //    .WithOne(x => x.StorageProvider)
            //    .HasForeignKey(x => x.IdStorageProvider)
            //    .OnDelete(DeleteBehavior.Cascade);

            builder.HasQueryFilter(x => x.DeletedAt == null);
        }
    }
}
