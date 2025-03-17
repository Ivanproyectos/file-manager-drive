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

            builder.HasIndex(x => new { x.UserId, x.FolderId })
             .IsUnique();

            builder.Property(x => x.CanView)
                .HasColumnType("bit")
                .HasConversion<bool>().IsRequired();

            builder.Property(x => x.CanDownload)
               .HasColumnType("bit")
               .HasConversion<bool>().IsRequired();

            builder.HasOne(x => x.Folder)
                 .WithMany()
                 .HasForeignKey(x => x.FolderId)
                 .OnDelete(DeleteBehavior.Cascade);

             builder.HasOne(x => x.User)
                 .WithMany()
                 .HasForeignKey(x => x.UserId)
                 .OnDelete(DeleteBehavior.Cascade);
            builder.HasQueryFilter(x => x.DeletedAt == null);
        }
    }
}
