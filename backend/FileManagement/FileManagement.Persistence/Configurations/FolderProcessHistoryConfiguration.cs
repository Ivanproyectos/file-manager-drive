using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    public class FolderProcessHistoryConfiguration : IEntityTypeConfiguration<FolderProcessHistory>
    {
        public void Configure(EntityTypeBuilder<FolderProcessHistory> builder)
        {
            builder.ToTable("FolderProcessHistories");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.FolderProcessStateId)
                .IsRequired();

            builder.Property(x => x.FolderId)
                .IsRequired();

            builder.Property(x => x.IsActive)
                .HasColumnType("BIT")
                .HasConversion<bool>().IsRequired()
                .HasDefaultValue(true)
                .IsRequired();

            builder.Property(x => x.Comment)
                .HasMaxLength(500)
                .IsRequired(false);

            

            builder.HasOne(x => x.FolderProcessStates)
                .WithMany()
                .HasForeignKey(x => x.FolderProcessStateId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.HasOne(x => x.Folder)
                .WithMany(x => x.FolderProcessHistories)
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

            builder.HasQueryFilter(x => x.DeletedAt == null);
        }
    }
}
