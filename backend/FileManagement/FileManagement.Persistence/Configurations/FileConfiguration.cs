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

            builder.Property(x => x.SizeBytes)
               .IsRequired();

            builder.HasOne(x => x.Folder)
                .WithMany(x => x.Files)
                .HasForeignKey(x => x.IdFolder)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
