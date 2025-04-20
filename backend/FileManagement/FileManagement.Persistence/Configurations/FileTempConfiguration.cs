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
    public class FileTempConfiguration : IEntityTypeConfiguration<FileTemp>
    {
        public void Configure(EntityTypeBuilder<FileTemp> builder)
        {

            builder.ToTable("FilesTemp");
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

            builder.Property(x => x.StorageIdentifier)
                   .HasMaxLength(100)
                   .IsRequired(false);
            

            builder.Property(x => x.SizeBytes)
               .IsRequired();


            builder.Property(x => x.UploadId)
                .HasMaxLength(100)
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
