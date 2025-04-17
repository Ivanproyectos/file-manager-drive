using FileManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FileManagement.Persistence.Configurations
{
    public class FolderProcessStatesConfiguration : IEntityTypeConfiguration<FolderProcessState>
    {
        public void Configure(EntityTypeBuilder<FolderProcessState> builder)
        {
            builder.ToTable("FolderProcessStates");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Name).HasMaxLength(100).IsRequired();

            builder.Property(x => x.Description).HasMaxLength(500).IsRequired(false);

            builder.Property(x => x.CreatedBy).IsRequired();

            builder.Property(x => x.CreatedAt).IsRequired();

            builder.Property(x => x.UpdatedAt).IsRequired(false);

            builder.Property(x => x.UpdatedBy).IsRequired(false);

            builder.HasQueryFilter(x => x.DeletedAt == null);

            //builder.HasData(
            //    new FolderProcessState[]
            //    {
            //        new FolderProcessState
            //        {
            //            Id = 1,
            //            Name = "Pendiente",
            //            Description = "Pendiente",
            //            CreatedAt = DateTime.Now,
            //            CreatedBy = 1,
            //        },
            //        new FolderProcessState
            //        {
            //            Id = 2,
            //            Name = "En proceso",
            //            Description = "En proceso",
            //            CreatedAt = DateTime.Now,
            //            CreatedBy = 1,
            //        },
            //        new FolderProcessState
            //        {
            //            Id = 3,
            //            Name = "Atendido",
            //            Description = "Atendido",
            //            CreatedAt = DateTime.Now,
            //            CreatedBy = 1,
            //        },
            //    }
            //);
            builder.HasData(
                new FolderProcessState { Id  = 1, Name = "Pendiente", Description  = "Pendiente", CreatedAt = DateTime.Now, CreatedBy = 1 }
            );
            builder.HasData(
                new FolderProcessState { Id = 2, Name = "En proceso", Description = "En proceso", CreatedAt = DateTime.Now, CreatedBy = 1 }
            );
            builder.HasData(
                new FolderProcessState { Id = 3, Name = "Atendido", Description = "Atendido", CreatedAt = DateTime.Now, CreatedBy = 1 }
            );
        }
    }
}
