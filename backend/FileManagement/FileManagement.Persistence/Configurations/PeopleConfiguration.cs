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
            builder.ToTable(b => b.HasCheckConstraint("CK_People_PersonType", "PersonType IN ('N', 'J')"));
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.PersonType)
                .HasMaxLength(1)
                .IsRequired();

            builder.Property(x => x.FirstName)
                .HasMaxLength(100)
                .IsRequired(false);

            builder.Property(x => x.LastName)
             .HasMaxLength(100)
             .IsRequired(false);

            builder.Property(x => x.BussinessName)
                .HasMaxLength(200)
                .IsRequired(false);


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

            builder.HasIndex(x => x.Email)
                .IsUnique()
                .HasFilter("DeletedAt IS NULL");

            builder.Property(x => x.Email)
              .HasMaxLength(100)
              .IsRequired();

            builder.Property(x => x.CreatedBy)
                 .IsRequired(false);

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

            builder.HasData(
                    new People
                    {
                        Id = 1,
                        PersonType = 'N',
                        FirstName = "John",
                        LastName = "Doe",
                        Identification = "123456789",
                        Address = "123 Main St",
                        Phone = "1234567890",
                        Email = "ivanperezt@gmail.com",
                        CreatedAt = DateTime.Now
                    }
                );

            builder.HasQueryFilter(x => x.DeletedAt == null);
        }
    }
}
