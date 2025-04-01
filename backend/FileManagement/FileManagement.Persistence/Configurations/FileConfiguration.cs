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
    public class FileConfiguration : IEntityTypeConfiguration<Core.Entities.File>
    {
        public void Configure(EntityTypeBuilder<Core.Entities.File> builder)
        {

            builder.ToTable("Files");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.FileName)
                .HasMaxLength(500)
                .IsRequired();

            builder.Property(x => x.Extension)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(x => x.MimeType)
               .HasMaxLength(100)
               .IsRequired();

            builder.Property(x => x.SizeBytes)
               .IsRequired();

            builder.HasOne(x => x.Folder)
                .WithMany(x => x.Files)
                .HasForeignKey(x => x.FolderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.CreatedBy)
                .IsRequired();

            builder.Property(x => x.CreatedAt)
               .IsRequired();

            builder.Property(x => x.UpdatedAt)
                .IsRequired(false);

            builder.Property(x => x.UpdatedBy)
               .IsRequired(false);

            builder.Ignore(x => x.Permission);


            //builder.HasOne(x => x.FileStorage)
            //    .WithOne()
            //    .HasForeignKey<File>(x => x.FileStorageId)
            //    .OnDelete(DeleteBehavior.Cascade);

            builder.HasQueryFilter(x => x.DeletedAt == null);

        }
    }
}
