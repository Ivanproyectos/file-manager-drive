using AutoMapper;
using FileManagement.Core.Constants;
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

            CreateMap<User, UserSummaryResponse>()
             .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.People.Email))
             .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.People.PersonType == PersonTypes.Natural ? src.People.FirstName + " " + src.People.LastName : src.People.BussinessName))
             .ForMember(dest => dest.PersonType, opt => opt.MapFrom(src => src.People.PersonType));

            CreateMap<User, UserDto>();

            CreateMap<People, PeopleDto>();
                //  .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.PersonType == PersonTypes.Natural ? src.FirstName + " " + src.LastName : src.BussinessName));


            #endregion

            #region dto to entity
            CreateMap<CreateFolderRequest, Folder>();
            CreateMap<CreateUserRequest, User>()
                .ForMember(dest => dest.People, opt => opt.Ignore());
            CreateMap<CreatePeopleRequest, People>();
            CreateMap<UpdatePeopleRequest, People>();
            #endregion
        }
    }
}
