using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    public class FilePermissionConfiguration : IEntityTypeConfiguration<FilePermission>
    {
        public void Configure(EntityTypeBuilder<FilePermission> builder)
        {
            builder.ToTable("FilePermissions");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasIndex(x => new { x.IdUser, x.IdFile })
             .IsUnique();

            builder.Property(x => x.CanView)
                .HasColumnType("bit")
                .HasConversion<bool>().IsRequired();

            builder.Property(x => x.CanDownload)
               .HasColumnType("bit")
               .HasConversion<bool>().IsRequired();

            builder.HasOne(x => x.File)
                 .WithMany(x => x.FilePermissions)
                 .HasForeignKey(x => x.IdFile)
                 .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.User)
                .WithMany(x => x.FilePermissions)
                .HasForeignKey(x => x.IdUser)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
