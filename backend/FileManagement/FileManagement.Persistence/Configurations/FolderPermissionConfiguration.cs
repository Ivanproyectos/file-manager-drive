using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    internal class FolderPermissionConfiguration : IEntityTypeConfiguration<FolderPermission>
    {
        public void Configure(EntityTypeBuilder<FolderPermission> builder)
        {
             builder.ToTable("FolderPermissions");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasIndex(x => new { x.IdUser, x.IdFolder })
             .IsUnique();

            builder.Property(x => x.CanView)
                .HasColumnType("bit")
                .HasConversion<bool>().IsRequired();

            builder.Property(x => x.CanDownload)
               .HasColumnType("bit")
               .HasConversion<bool>().IsRequired();

            builder.HasOne(x => x.Folder)
                 .WithMany(x => x.FolderPermissions)
                 .HasForeignKey(x => x.IdFolder)
                 .OnDelete(DeleteBehavior.Cascade);

             builder.HasOne(x => x.User)
                 .WithMany(x => x.FolderPermissions)
                 .HasForeignKey(x => x.IdUser)
                 .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
