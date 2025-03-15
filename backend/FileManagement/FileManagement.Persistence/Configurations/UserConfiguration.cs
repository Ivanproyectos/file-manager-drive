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
    public class UserConfiguration: IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("User");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Status)
                .HasColumnType("BIT") // Para SQL Server
                .HasDefaultValue(true)
                .HasMaxLength(500)
                .IsRequired();

            builder.Property(x => x.PasswordHash)
              .HasMaxLength(500)
              .IsRequired();

            builder.HasIndex(x => x.Username).IsUnique();

            builder.Property(x => x.Username)
              .HasMaxLength(100)
              .IsRequired();

            builder.Property(x => x.CreatedBy)
                .HasMaxLength(30)
                .IsRequired(false);

            builder.Property(x => x.CreatedAt)
               .IsRequired(false);

            builder.Property(x => x.UpdatedAt)
                  .HasMaxLength(30)
                .IsRequired(false);

            builder.Property(x => x.UpdatedBy)
               .IsRequired(false);

            builder.HasOne(u => u.People)
                 .WithOne()
                 .HasForeignKey<User>(u => u.IdPerson)
                 .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(u => u.CreatedByUser)
                .WithMany()
                .HasForeignKey(u => u.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(u => u.UpdatedByUser)
                .WithMany()
                .HasForeignKey(u => u.UpdatedBy)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
