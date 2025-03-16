using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    public class PeopleConfiguration: IEntityTypeConfiguration<People>
    {
        public void Configure(EntityTypeBuilder<People> builder)
        {
            builder.ToTable("Peoples");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.PersonType)
                .HasMaxLength(1)
                .IsRequired();

            builder.Property(x => x.Name)
                .HasMaxLength(200)
                .IsRequired();

            builder.HasIndex(x => x.Identification).IsUnique();

            builder.Property(x => x.Identification)
               .HasMaxLength(200)
               .IsRequired();

            builder.Property(x => x.Address)
              .HasMaxLength(500)
              .IsRequired();

            builder.Property(x => x.Phone)
              .HasMaxLength(100)
              .IsRequired();

            builder.HasIndex(x => x.Email).IsUnique();

            builder.Property(x => x.Email)
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
