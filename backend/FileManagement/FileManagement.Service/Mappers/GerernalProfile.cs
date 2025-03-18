using AutoMapper;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Contracts.Response;
using FileManagement.Core.Entities;

namespace FileManagement.Service.Mappers
{
    internal class GerernalProfile: Profile
    {
        public GerernalProfile()
        {
            #region entity to dto
            CreateMap<Folder, CreateFolderResponse>();
            CreateMap<Folder, FolderDto>();
            CreateMap<Core.Entities.File, FileDto>()
                .ForMember(dest => dest.CanView, opt => opt.MapFrom(src => src.Permission.CanView))
                .ForMember(dest => dest.CanDownload, opt => opt.MapFrom(src => src.Permission.CanDownload))
                .ForMember(dest => dest.ExpirationDate, opt => opt.MapFrom(src => src.Permission.ExpirationDate.ToString("o")));

            //CreateMap<List<Core.Entities.File>, List<FileDto>>();

            #endregion

            #region dto to entity
            CreateMap<CreateFolderRequest, Folder>();
            CreateMap<CreateUserRequest, User>()
                .ForMember(dest => dest.People, opt => opt.Ignore());
            CreateMap<CreatePeopleRequest, People>();
            #endregion
        }
    }
}
