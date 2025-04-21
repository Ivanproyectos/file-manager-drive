using AutoMapper;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Entities;
using FileManagement.Service.Helpers;

namespace FileManagement.Service.Mappers
{
    public class FolderProfile : Profile
    {
        public FolderProfile()
        {
            CreateMap<Folder, FolderDto>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedAt))
               
                .ForMember(dest => dest.Size, opt => opt.MapFrom(src => SumChildFoldersSizeAsync(src)))
                .ForMember(dest => dest.Users, opt => opt.MapFrom(src => src.UserFolders.Select(uf => new UserFolderDto
                {
                    Name = FormatPeopleName.FormatPeopleType(uf.User.People),
                    Email = uf.User.People.Email
                }).ToList()));


            CreateMap<FolderProcessHistory, FolderProcessHistoryDto>()
                .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.FolderProcessStates));

            CreateMap<FolderProcessState, FolderProcessStateDto>();

        }

        private long SumChildFoldersSizeAsync(Folder folder)
        {
            if (folder == null) return 0;

            long totalSize = folder.Files?.Sum(x => x.SizeBytes) ?? 0;

            if (folder.SubFolders == null) return totalSize;
            //Recorre todos los folders hijos
            foreach (var childFolder in folder.SubFolders)
            {
                // Llama recursivamente para obtener los archivos de los subfolders
                totalSize +=  SumChildFoldersSizeAsync(childFolder);
            }

            return totalSize;
        }
    }
}
