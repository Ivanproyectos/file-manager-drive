using System.Xml;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.DependencyInjection;

namespace FileManagement.Persistence.Configurations
{
    public class UserConfiguration: IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Status)
                .HasColumnType("BIT")
                .HasConversion<bool>().IsRequired()
                .HasDefaultValue(false)
                .IsRequired();

            builder.Property(x => x.IsExpired)
                .HasColumnType("BIT") 
                .HasConversion<bool>().IsRequired()
                .HasDefaultValue(false)
                .IsRequired();

            builder.Property(x => x.HasChangedPassword)
                .HasColumnType("BIT")
                .HasConversion<bool>().IsRequired()
                .HasDefaultValue(false)
                .IsRequired();

            builder.Property(x => x.ExpirationDate)
                .IsRequired(false);


            builder.Property(x => x.PasswordHash)
                  .HasMaxLength(500)
                  .IsRequired();

            //builder.HasIndex(x => x.UserName).IsUnique();

            //builder.Property(x => x.UserName)
            //  .HasMaxLength(100)
            //  .IsRequired();

            builder.Property(x => x.CreatedBy)
                     .IsRequired(false);

            builder.Property(x => x.CreatedAt)
               .IsRequired();

            builder.Property(x => x.UpdatedAt)
                .IsRequired(false);

            builder.Property(x => x.UpdatedBy)
               .IsRequired(false);

            builder.Property(x => x.DeletedAt)
              .IsRequired(false);

            builder.HasOne(u => u.People)
                 .WithOne(u => u.User)
                 .HasForeignKey<User>(u => u.PeopleId)
                 .OnDelete(DeleteBehavior.Restrict);

            //builder.HasOne(u => u.CreatedByUser)
            //    .WithMany()
            //    .HasForeignKey(u => u.CreatedBy)
            //    .OnDelete(DeleteBehavior.Restrict)
            //    .HasPrincipalKey(u => u.Id);

            //builder.HasOne(u => u.UpdatedByUser)
            //    .WithMany()
            //    .HasForeignKey(u => u.UpdatedBy)
            //    .OnDelete(DeleteBehavior.Restrict)
            //    .HasPrincipalKey(u => u.Id);

            builder.HasQueryFilter(x => x.DeletedAt == null);

            builder.HasData(
                new User
                {
                    Id = 1,
                    PeopleId = 1,
                    //UserName = "admin",
                    PasswordHash = "change password for password hash",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Status = true
                });


        }
    }
}
