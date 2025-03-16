using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    public class UserFolderConfiguration : IEntityTypeConfiguration<UserFolder>
    {
        public void Configure(EntityTypeBuilder<UserFolder> builder)
        {
            builder.ToTable("UserFolders");
            builder.HasKey(x => new { x.IdUser, x.IdFolder });

            builder.HasOne(x => x.Folder)
                .WithMany(x => x.UserFolders)
                .HasForeignKey(x => x.IdFolder)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.User)
              .WithMany(x => x.UserFolders)
              .HasForeignKey(x => x.IdUser)
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
